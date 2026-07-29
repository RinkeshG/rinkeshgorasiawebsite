const crypto = require('crypto');
const { list, put } = require('@vercel/blob');
const engine = require('../assets/cricket-engine.js');

const SCORE_PREFIX = 'website/cricket-scores/';
const CACHE_MS = 45 * 1000;
let leaderboardCache = null;

function bengaluruDate() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(new Date());
  const values = {};
  parts.forEach(part => { values[part.type] = part.value; });
  return `${values.year}-${values.month}-${values.day}`;
}

function secret() {
  return process.env.CRICKET_SCORE_SECRET || process.env.BLOB_READ_WRITE_TOKEN || '';
}

function tokenFor(date) {
  const key = secret();
  if (!key) return '';
  return crypto.createHmac('sha256', key).update(`last-over:${date}:v${engine.version}`).digest('hex');
}

function safeEqual(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

function cleanInitials(value) {
  return String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 3) || 'RG';
}

function entryFromPath(pathname) {
  const match = pathname.match(/cricket-scores\/(\d{4}-\d{2}-\d{2})\/(\d{2})-([A-Z0-9]{1,3})-/);
  if (!match) return null;
  return { date: match[1], score: Number(match[2]), initials: match[3] };
}

function bestOf(entries) {
  return entries.reduce((best, entry) => {
    if (!entry || !Number.isFinite(entry.score)) return best;
    if (!best || entry.score > best.score) return entry;
    return best;
  }, null);
}

async function listEntries() {
  const now = Date.now();
  if (leaderboardCache && now - leaderboardCache.at < CACHE_MS) return leaderboardCache.entries;
  const blobs = [];
  let cursor;
  do {
    const page = await list({ prefix: SCORE_PREFIX, limit: 1000, cursor });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor && blobs.length < 5000);
  const entries = blobs.map(blob => entryFromPath(blob.pathname)).filter(Boolean);
  leaderboardCache = { at: now, entries };
  return entries;
}

async function leaderboard(date) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return { dailyBest: null, allTimeBest: null, storage: 'local' };
  }
  const entries = await listEntries();
  return {
    dailyBest: bestOf(entries.filter(entry => entry.date === date)),
    allTimeBest: bestOf(entries),
    storage: 'blob'
  };
}

function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  try { return JSON.parse(req.body || '{}'); } catch (error) { return {}; }
}

function validSwings(swings) {
  if (!Array.isArray(swings) || swings.length < 1 || swings.length > 6) return false;
  return swings.every(swing => {
    if (!swing || typeof swing !== 'object') return false;
    if (swing.t == null) return true;
    return Number.isFinite(swing.t) && swing.t >= 0 && swing.t <= 1 &&
           Number.isFinite(swing.aim) && swing.aim >= -1 && swing.aim <= 1;
  });
}

module.exports = async function handler(req, res) {
  const date = bengaluruDate();
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'GET') {
    try {
      const scores = await leaderboard(date);
      return res.status(200).json({
        date,
        token: tokenFor(date),
        deliveries: engine.deliveriesFor(date).map(delivery => ({
          kind: delivery.kind, label: delivery.label, duration: delivery.duration
        })),
        ...scores
      });
    } catch (error) {
      console.error('Cricket leaderboard failed:', error.message);
      return res.status(200).json({ date, token: tokenFor(date), dailyBest: null, allTimeBest: null, storage: 'local' });
    }
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return res.status(503).json({ error: 'Global scoring is not configured' });

  const body = readBody(req);
  if (body.date !== date || !safeEqual(String(body.token || ''), tokenFor(date))) {
    return res.status(400).json({ error: 'This over has expired. Reload for today’s challenge.' });
  }
  if (!validSwings(body.swings)) return res.status(400).json({ error: 'Invalid scorecard' });

  const over = engine.scoreOver(date, body.swings);
  const complete = over.results.length === 6 || over.wickets >= 2;
  if (!complete || over.results.length !== body.swings.length) {
    return res.status(400).json({ error: 'The over is incomplete' });
  }

  try {
    const current = await leaderboard(date);
    if (current.dailyBest && over.score <= current.dailyBest.score) {
      return res.status(200).json({ accepted: false, score: over.score, ...current });
    }

    const initials = cleanInitials(body.initials);
    const padded = String(over.score).padStart(2, '0');
    const id = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
    const pathname = `${SCORE_PREFIX}${date}/${padded}-${initials}-${id}.json`;
    await put(pathname, JSON.stringify({
      date, initials, score: over.score, wickets: over.wickets,
      marks: over.results.map(result => result.mark), engine: engine.version
    }), {
      access: 'public', contentType: 'application/json', addRandomSuffix: false
    });
    leaderboardCache = null;
    const updated = await leaderboard(date);
    return res.status(200).json({ accepted: true, score: over.score, ...updated });
  } catch (error) {
    console.error('Cricket score submission failed:', error.message);
    return res.status(503).json({ error: 'The scorebook is temporarily unavailable' });
  }
};
