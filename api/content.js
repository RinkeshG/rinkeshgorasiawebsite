const { put } = require('@vercel/blob');

const BASE_ID = process.env.AIRTABLE_BASE_ID || 'appHRxyBmJm7JRSza';
const TABLES = {
  places: { id: 'tblOvLCDeAU1Ahh7T', folder: 'places' },
  games: { id: 'tbl4kiDoQDJ4zcaJb', folder: 'games' }
};

function text(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function number(value) {
  return Number.isFinite(value) ? value : null;
}

function safePathPart(value) {
  return text(value).toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '') || 'image';
}

function extension(filename, contentType) {
  const fromName = text(filename).match(/\.([a-z0-9]{2,5})$/i);
  if (fromName) return fromName[1].toLowerCase().replace('jpeg', 'jpg');
  if (contentType === 'image/png') return 'png';
  if (contentType === 'image/webp') return 'webp';
  if (contentType === 'image/avif') return 'avif';
  return 'jpg';
}

async function airtable(path, options = {}) {
  const token = process.env.AIRTABLE_TOKEN;
  if (!token) throw new Error('AIRTABLE_TOKEN is not configured');
  const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  if (!response.ok) throw new Error(`Airtable request failed (${response.status})`);
  return response.json();
}

async function syncImage(kind, table, record) {
  const fields = record.fields || {};
  const upload = Array.isArray(fields['Image upload']) ? fields['Image upload'][0] : null;
  const existingBlob = text(fields['Blob URL']);
  if (!upload || !upload.url) return existingBlob || text(fields['Image path']);
  if (existingBlob && fields['Synced attachment ID'] === upload.id) return existingBlob;

  if (!process.env.BLOB_READ_WRITE_TOKEN) return existingBlob || upload.url || text(fields['Image path']);

  try {
    const source = await fetch(upload.url);
    if (!source.ok) throw new Error(`Attachment download failed (${source.status})`);
    const contentType = source.headers.get('content-type') || upload.type || 'image/jpeg';
    if (!contentType.startsWith('image/')) throw new Error('Attachment is not an image');
    const pathname = `website/${table.folder}/${safePathPart(fields.Slug || fields.Name)}.${extension(upload.filename, contentType)}`;
    const blob = await put(pathname, await source.arrayBuffer(), {
      access: 'public',
      contentType,
      addRandomSuffix: false,
      allowOverwrite: true
    });
    await airtable(`${table.id}/${record.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ fields: { 'Blob URL': blob.url, 'Synced attachment ID': upload.id } })
    });
    return blob.url;
  } catch (error) {
    console.error(`Image sync failed for ${kind}/${record.id}:`, error.message);
    return existingBlob || upload.url || text(fields['Image path']);
  }
}

async function listRecords(table) {
  const records = [];
  let offset = '';
  do {
    const params = new URLSearchParams({
      pageSize: '100',
      filterByFormula: '{Published}=TRUE()',
      'sort[0][field]': 'Sort order',
      'sort[0][direction]': 'asc'
    });
    if (offset) params.set('offset', offset);
    const page = await airtable(`${table.id}?${params}`);
    records.push(...(page.records || []));
    offset = page.offset || '';
  } while (offset);
  return records;
}

function placeRecord(record, image) {
  const f = record.fields || {};
  const categories = Array.isArray(f.Categories) ? f.Categories.map(value => text(value).toLowerCase()).filter(Boolean) : [];
  const context = {};
  if (text(f['Work note'])) context.work = { label: 'Why I work here', text: text(f['Work note']) };
  if (text(f['Late note'])) context.late = { label: 'Why I go late', text: text(f['Late note']) };
  return {
    id: text(f.Slug),
    name: text(f.Name),
    area: text(f.Area),
    /* when the row was created, so the page can say what was added most
       recently instead of hardcoding a name that goes stale */
    added: text(record.createdTime),
    latitude: number(f.Latitude),
    longitude: number(f.Longitude),
    categories,
    description: text(f.Description),
    drink: text(f['Drink recommendation']),
    food: text(f['Food recommendation']),
    context,
    image,
    imageAlt: text(f['Image alt']) || `${text(f.Name)} in ${text(f.Area)}`
  };
}

function gameRecord(record, image) {
  const f = record.fields || {};
  const playersMin = number(f['Players min']);
  const playersMax = number(f['Players max']);
  const durationMax = number(f['Duration max']);
  const learning = text(f.Learning).toLowerCase();
  const playerFits = [];
  if (playersMin !== null && playersMax !== null && playersMin <= 2 && playersMax >= 2) playerFits.push('two');
  if (playersMax !== null && playersMax >= 4) playerFits.push('group');
  return {
    id: text(f.Slug),
    name: text(f.Name),
    /* same as places: lets the shelf name the newest one without a hardcoded
       title going stale. Note this is when the row was created, not when the
       game was last played, which Airtable does not currently track. */
    added: text(record.createdTime),
    image,
    imageAlt: text(f['Image alt']) || `${text(f.Name)} board game`,
    description: text(f['Card description']),
    type: text(f.Type),
    playersMin,
    playersMax,
    players: text(f['Players display']),
    playerFits,
    durationMin: number(f['Duration min']),
    durationMax,
    duration: text(f['Duration display']),
    learning,
    quick: durationMax !== null && durationMax <= 45,
    easy: learning === 'quick' || learning === 'easy',
    favourite: Boolean(f.Favourite),
    wantToPlay: Boolean(f['Want to play']),
    callout: text(f.Callout),
    verdict: text(f.Verdict),
    stats: [
      ['best with', text(f['Best with'])],
      ['table volume', text(f['Table volume'])],
      [text(f['Third stat label']), text(f['Third stat value'])]
    ].filter(stat => stat[0] && stat[1])
  };
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const kind = req.query && req.query.type;
  const table = TABLES[kind];
  if (!table) return res.status(400).json({ error: 'Use type=places or type=games' });

  try {
    const records = await listRecords(table);
    const items = await Promise.all(records.map(async record => {
      const image = await syncImage(kind, table, record);
      return kind === 'places' ? placeRecord(record, image) : gameRecord(record, image);
    }));
    const validItems = items.filter(item => item.id && item.name && item.image);
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.status(200).json({ items: validItems, source: 'airtable' });
  } catch (error) {
    console.error('Content API failed:', error.message);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).json({ error: 'Content is temporarily unavailable' });
  }
};
