/* Deterministic six-ball cricket engine shared by the browser and score API. */
(function (root, factory) {
  var engine = factory();
  if (typeof module === 'object' && module.exports) module.exports = engine;
  else root.CricketEngine = engine;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var VERSION = 1;
  var TYPES = {
    full:   { length: .72, ideal: .895, target: .28, pace: 1.00 },
    good:   { length: .61, ideal: .91,  target: .48, pace: 1.03 },
    short:  { length: .47, ideal: .865, target: .76, pace: 1.08 },
    yorker: { length: .82, ideal: .925, target: .14, pace: 1.06 },
    slower: { length: .63, ideal: .94,  target: .44, pace: .84 },
    spin:   { length: .58, ideal: .915, target: .58, pace: .78 }
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function hashString(value) {
    var hash = 2166136261;
    for (var i = 0; i < value.length; i++) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function mulberry32(seed) {
    return function () {
      seed |= 0;
      seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function shuffle(list, random) {
    for (var i = list.length - 1; i > 0; i--) {
      var j = Math.floor(random() * (i + 1));
      var value = list[i]; list[i] = list[j]; list[j] = value;
    }
    return list;
  }

  function lineLabel(line) {
    if (line < -.38) return 'outside off';
    if (line < -.12) return 'fourth stump';
    if (line < .16) return 'on middle';
    if (line < .4) return 'on the pads';
    return 'wide on leg';
  }

  function deliveryLabel(kind, line) {
    var names = {
      full: 'full', good: 'good length', short: 'short', yorker: 'yorker',
      slower: 'slower ball', spin: 'turning ball'
    };
    return names[kind] + ' · ' + lineLabel(line);
  }

  function deliveriesFor(date) {
    var random = mulberry32(hashString(String(date) + ':last-over:v' + VERSION));
    var order = shuffle(['full', 'good', 'short', 'yorker', 'slower', 'spin'], random);
    return order.map(function (kind, index) {
      var type = TYPES[kind];
      var line = clamp((random() * 1.08) - .54, -.54, .54);
      var drift = kind === 'spin' ? ((random() > .5 ? 1 : -1) * (.12 + random() * .13)) :
                  kind === 'slower' ? ((random() - .5) * .1) : ((random() - .5) * .055);
      return {
        index: index,
        kind: kind,
        label: deliveryLabel(kind, line),
        line: line,
        drift: drift,
        bounce: type.length,
        ideal: type.ideal,
        target: type.target,
        duration: Math.round((1420 / type.pace) + (random() * 90 - 45))
      };
    });
  }

  function scoreDelivery(delivery, swing) {
    var onStumps = Math.abs(delivery.line + delivery.drift) < .24;
    if (!swing || swing.t == null) {
      if (onStumps && delivery.kind !== 'short') {
        return { runs: 0, wicket: true, mark: 'W', call: 'Left it. That one came back.' };
      }
      return { runs: 0, wicket: false, mark: '•', call: 'Well left.' };
    }

    var t = clamp(Number(swing.t), 0, 1);
    var aim = clamp(Number(swing.aim), -1, 1);
    var timing = clamp(1 - Math.abs(t - delivery.ideal) / .19, 0, 1);
    var shotFit = clamp(1 - Math.abs(Math.abs(aim) - delivery.target) / .72, 0, 1);
    var naturalLine = clamp((delivery.line + delivery.drift) * .62, -.7, .7);
    var lineFit = clamp(1 - Math.abs(aim - naturalLine) / 1.05, 0, 1);
    var quality = timing * .68 + shotFit * .2 + lineFit * .12;

    if (timing < .12 && onStumps) {
      return { runs: 0, wicket: true, mark: 'W', call: 'Beaten for pace.' };
    }
    if (timing < .22) {
      return { runs: 0, wicket: false, mark: '•', call: t < delivery.ideal ? 'Too early.' : 'Too late.' };
    }
    if (quality >= .885 && timing >= .84 && shotFit >= .7) {
      return { runs: 6, wicket: false, mark: '6', call: 'Middle of the bat. Into the seats.' };
    }
    if (quality >= .73) {
      return { runs: 4, wicket: false, mark: '4', call: 'Found the rope.' };
    }
    if (quality >= .59) {
      return { runs: 2, wicket: false, mark: '2', call: 'Into the gap. Come back for two.' };
    }
    if (quality >= .43) {
      return { runs: 1, wicket: false, mark: '1', call: 'Not pretty. Still a run.' };
    }
    return { runs: 0, wicket: false, mark: '•', call: 'Straight to the fielder.' };
  }

  function scoreOver(date, swings) {
    var deliveries = deliveriesFor(date);
    var score = 0, wickets = 0, results = [];
    var limit = swings ? Math.min(deliveries.length, swings.length) : deliveries.length;
    for (var i = 0; i < limit && wickets < 2; i++) {
      var result = scoreDelivery(deliveries[i], swings && swings[i]);
      score += result.runs;
      if (result.wicket) wickets++;
      results.push(result);
    }
    return { score: score, wickets: wickets, results: results, deliveries: deliveries };
  }

  return {
    version: VERSION,
    clamp: clamp,
    deliveriesFor: deliveriesFor,
    scoreDelivery: scoreDelivery,
    scoreOver: scoreOver
  };
});
