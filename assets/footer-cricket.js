/* THE LAST OVER — a six-ball footer game, loaded only on request. */
(function (root) {
  'use strict';

  var mounted = null;
  var engine = root.CricketEngine;
  if (!engine) return;

  function istDate() {
    try {
      return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit'
      }).format(new Date());
    } catch (error) {
      return new Date().toISOString().slice(0, 10);
    }
  }

  function storeGet(key, fallback) {
    try { return localStorage.getItem(key) || fallback; } catch (error) { return fallback; }
  }

  function storeSet(key, value) {
    try { localStorage.setItem(key, String(value)); } catch (error) {}
  }

  function createGame(options) {
    var footer = options.footer;
    var trigger = options.trigger;
    var reduceMotion = Boolean(options.reduced);
    var footIn = footer.querySelector('.foot-in');
    var game = document.createElement('section');
    game.id = 'footer-cricket-game';
    game.className = 'footer-cricket-game';
    game.dataset.state = 'closed';
    game.dataset.phase = 'idle';
    game.hidden = true;
    game.setAttribute('aria-label', 'The Last Over cricket game');
    game.innerHTML = [
      '<header class="fc-scoreboard" data-slot="cricket-scoreboard">',
        '<div class="fc-identity"><span class="fc-kicker">THE LAST OVER</span><strong class="fc-score"><span data-score>0</span><small>/<span data-wickets>0</span></small></strong></div>',
        '<ol class="fc-balls" aria-label="This over">',
          '<li data-ball="0">–</li><li data-ball="1">–</li><li data-ball="2">–</li>',
          '<li data-ball="3">–</li><li data-ball="4">–</li><li data-ball="5">–</li>',
        '</ol>',
        '<div class="fc-records" role="list" aria-label="High scores">',
          '<span role="listitem">PB <strong data-pb>0</strong></span><span role="listitem">TODAY <strong data-daily>—</strong></span><span class="fc-all-time" role="listitem">ALL-TIME <strong data-all-time>—</strong></span>',
        '</div>',
        '<div class="fc-actions">',
          '<button class="fc-icon-button" type="button" data-sound aria-pressed="true" aria-label="Mute game sounds" title="Mute sounds">',
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Zm12.5 3a4.5 4.5 0 0 0-2.2-3.9v7.8a4.5 4.5 0 0 0 2.2-3.9Zm-2.2-8v2.1a7 7 0 0 1 0 11.8V20a9 9 0 0 0 0-16Z"/></svg>',
          '</button>',
          '<button class="fc-close" type="button" data-close>Close ×</button>',
        '</div>',
      '</header>',
      '<div class="fc-field" data-field data-slot="cricket-field" tabindex="0" role="group" aria-describedby="fc-instructions">',
        '<div class="fc-pitch-scene" aria-hidden="true"></div>',
        '<img class="fc-wicket fc-wicket--bowler" src="assets/img/cricket/wicket-v1.webp" alt="" aria-hidden="true">',
        '<img class="fc-wicket fc-wicket--striker" data-stumps src="assets/img/cricket/wicket-v1.webp" alt="" aria-hidden="true">',
        '<img class="fc-bowler" data-bowler src="assets/img/cricket/bowler-v1.webp" alt="" aria-hidden="true">',
        '<img class="fc-batter" data-batter src="assets/img/cricket/batter-v1.webp" alt="" aria-hidden="true">',
        '<div class="fc-shot-guide" data-guide aria-hidden="true"></div>',
        '<span class="fc-ball-shadow" data-ball-shadow aria-hidden="true"></span>',
        '<span class="fc-game-ball" data-game-ball aria-hidden="true"><i></i></span>',
        '<span class="fc-result-flash" data-result aria-hidden="true"></span>',
      '</div>',
      '<div class="fc-console" data-slot="cricket-console">',
        '<div class="fc-commentary">',
          '<p class="fc-delivery" data-delivery>Today’s six are waiting.</p>',
          '<p class="fc-status" data-status role="status" aria-live="polite">Pick a gap. Time the swing.</p>',
        '</div>',
        '<p class="fc-instructions" id="fc-instructions"><span class="fc-desktop-help">Move to choose the shot · click or Space to swing</span><span class="fc-touch-help">Tap where you want to hit · let it pass to leave</span></p>',
        '<button class="fc-start" type="button" data-start>Take guard</button>',
      '</div>',
      '<form class="fc-record-form" data-record-form hidden>',
        '<label for="fc-initials"><strong>New daily best.</strong> Put your initials in the book.</label>',
        '<div><input id="fc-initials" data-initials inputmode="text" autocomplete="off" maxlength="3" pattern="[A-Za-z0-9]{1,3}" aria-label="Your initials"><button type="submit">Claim the record</button></div>',
        '<p data-submit-status role="status" aria-live="polite"></p>',
      '</form>'
    ].join('');
    footer.appendChild(game);

    var field = game.querySelector('[data-field]');
    var startButton = game.querySelector('[data-start]');
    var closeButton = game.querySelector('[data-close]');
    var soundButton = game.querySelector('[data-sound]');
    var ball = game.querySelector('[data-game-ball]');
    var ballShadow = game.querySelector('[data-ball-shadow]');
    var bowler = game.querySelector('[data-bowler]');
    var batter = game.querySelector('[data-batter]');
    var stumps = game.querySelector('[data-stumps]');
    var guide = game.querySelector('[data-guide]');
    var resultFlash = game.querySelector('[data-result]');
    var deliveryText = game.querySelector('[data-delivery]');
    var statusText = game.querySelector('[data-status]');
    var scoreText = game.querySelector('[data-score]');
    var wicketText = game.querySelector('[data-wickets]');
    var pbText = game.querySelector('[data-pb]');
    var dailyText = game.querySelector('[data-daily]');
    var allTimeText = game.querySelector('[data-all-time]');
    var ballMarks = Array.prototype.slice.call(game.querySelectorAll('[data-ball]'));
    var recordForm = game.querySelector('[data-record-form]');
    var initialsInput = game.querySelector('[data-initials]');
    var recordButton = recordForm.querySelector('button');
    var submitStatus = game.querySelector('[data-submit-status]');
    var state = {
      open: false, phase: 'idle', date: istDate(), token: '', storage: 'local',
      deliveries: engine.deliveriesFor(istDate()), dailyBest: null, allTimeBest: null,
      swings: [], results: [], score: 0, wickets: 0, ballIndex: 0,
      aim: 0, progress: 0, deliveryRunning: false, swung: false,
      raf: 0, timer: 0, audio: null, sound: storeGet('last-over-sound', 'on') !== 'off',
      personalBest: Number(storeGet('last-over-pb', '0')) || 0,
      noMotion: reduceMotion, paused: false
    };

    function setText(element, value) { if (element) element.textContent = value; }

    function updateRecords() {
      setText(pbText, state.personalBest);
      setText(dailyText, state.dailyBest ? state.dailyBest.score + ' · ' + state.dailyBest.initials : '—');
      setText(allTimeText, state.allTimeBest ? state.allTimeBest.score + ' · ' + state.allTimeBest.initials : '—');
    }

    function scorebook() {
      setText(scoreText, state.score);
      setText(wicketText, state.wickets);
      ballMarks.forEach(function (item, index) {
        var result = state.results[index];
        item.textContent = result ? result.mark : '–';
        item.dataset.state = result ? (result.wicket ? 'wicket' : result.runs >= 4 ? 'boundary' : 'played') : 'waiting';
      });
    }

    function challengeFallback() {
      state.date = istDate();
      state.deliveries = engine.deliveriesFor(state.date);
      updateRecords();
    }

    function loadChallenge() {
      challengeFallback();
      return fetch('/api/cricket-score', { headers: { Accept: 'application/json' } }).then(function (response) {
        if (!response.ok) throw new Error('scorebook unavailable');
        return response.json();
      }).then(function (data) {
        state.date = data.date || state.date;
        state.token = data.token || '';
        state.storage = data.storage || 'local';
        state.dailyBest = data.dailyBest || null;
        state.allTimeBest = data.allTimeBest || null;
        state.deliveries = engine.deliveriesFor(state.date);
        updateRecords();
      }).catch(function () {
        state.storage = 'local';
        updateRecords();
      });
    }

    function isPortrait() {
      return root.matchMedia('(max-width: 720px)').matches;
    }

    function geometry(progress, delivery) {
      var portrait = isPortrait();
      var afterBounce = progress > delivery.bounce ? (progress - delivery.bounce) / (1 - delivery.bounce) : 0;
      var lateral = delivery.line * .12 + delivery.drift * afterBounce;
      if (portrait) {
        return { x: .5 + lateral, y: .18 + progress * .62, portrait: true };
      }
      return { x: .82 - progress * .62, y: .5 + lateral, portrait: false };
    }

    function ballTransform(point, scale) {
      var x = point.x * field.clientWidth - 6;
      var y = point.y * field.clientHeight - 6;
      return 'translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,0) scale(' + scale.toFixed(3) + ')';
    }

    function renderBall(progress, delivery) {
      var point = geometry(progress, delivery);
      var bounceDistance = Math.abs(progress - delivery.bounce);
      var bounceScale = 1 - Math.max(0, .12 - bounceDistance) * 1.1;
      var scale = (.74 + progress * .36) * bounceScale;
      var transform = ballTransform(point, scale);
      ball.style.transform = transform;
      ballShadow.style.transform = ballTransform(point, .72 + progress * .18);
      ballShadow.style.opacity = String(.12 + progress * .28);
      if (bounceDistance < .018 && !ball.dataset.bounced) {
        ball.dataset.bounced = 'true';
        sound('bounce');
      }
    }

    function aimGuide() {
      var portrait = isPortrait();
      var angle = portrait ? (-90 + state.aim * 58) : (180 + state.aim * 58);
      guide.style.transform = 'rotate(' + angle.toFixed(1) + 'deg)';
      var batterAngle = portrait ? state.aim * 3.5 : 90 + state.aim * 3.5;
      batter.style.transform = 'translate(-50%,-50%) rotate(' + batterAngle.toFixed(1) + 'deg)';
    }

    function updateAim(clientX, clientY) {
      var rect = field.getBoundingClientRect();
      if (isPortrait()) state.aim = engine.clamp((clientX - (rect.left + rect.width * .5)) / (rect.width * .44), -1, 1);
      else state.aim = engine.clamp((clientY - (rect.top + rect.height * .5)) / (rect.height * .42), -1, 1);
      aimGuide();
    }

    function audioContext() {
      if (!state.sound) return null;
      if (!state.audio) {
        var AudioCtor = root.AudioContext || root.webkitAudioContext;
        if (!AudioCtor) return null;
        state.audio = new AudioCtor();
      }
      if (state.audio.state === 'suspended') state.audio.resume();
      return state.audio;
    }

    function noiseBurst(context, duration, frequency, gainValue) {
      var frames = Math.max(1, Math.floor(context.sampleRate * duration));
      var buffer = context.createBuffer(1, frames, context.sampleRate);
      var data = buffer.getChannelData(0);
      for (var i = 0; i < frames; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / frames);
      var source = context.createBufferSource();
      var filter = context.createBiquadFilter();
      var gain = context.createGain();
      filter.type = 'bandpass'; filter.frequency.value = frequency; filter.Q.value = 1.8;
      gain.gain.setValueAtTime(gainValue, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + duration);
      source.buffer = buffer; source.connect(filter); filter.connect(gain); gain.connect(context.destination);
      source.start(); source.stop(context.currentTime + duration);
    }

    function tone(context, from, to, duration, volume, type) {
      var oscillator = context.createOscillator();
      var gain = context.createGain();
      oscillator.type = type || 'sine';
      oscillator.frequency.setValueAtTime(from, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(to, context.currentTime + duration);
      gain.gain.setValueAtTime(volume, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + duration);
      oscillator.connect(gain); gain.connect(context.destination);
      oscillator.start(); oscillator.stop(context.currentTime + duration);
    }

    function sound(kind) {
      var context = audioContext();
      if (!context) return;
      if (kind === 'bounce') { noiseBurst(context, .045, 620, .055); tone(context, 105, 78, .055, .035); }
      if (kind === 'middle') { noiseBurst(context, .035, 1250, .09); tone(context, 175, 92, .13, .12, 'triangle'); }
      if (kind === 'edge') { noiseBurst(context, .045, 2250, .075); tone(context, 720, 480, .06, .045, 'square'); }
      if (kind === 'wicket') {
        tone(context, 310, 190, .07, .08, 'square');
        setTimeout(function () { tone(context, 260, 150, .08, .065, 'square'); }, 55);
      }
      if (kind === 'record') {
        tone(context, 320, 510, .16, .045, 'triangle');
        setTimeout(function () { tone(context, 420, 660, .2, .04, 'triangle'); }, 90);
      }
    }

    function clearPlay() {
      cancelAnimationFrame(state.raf);
      clearTimeout(state.timer);
      state.deliveryRunning = false;
      ball.classList.remove('is-live');
      ballShadow.classList.remove('is-live');
      bowler.classList.remove('is-delivering');
    }

    function resetOver() {
      clearPlay();
      state.phase = 'ready'; state.swings = []; state.results = [];
      state.score = 0; state.wickets = 0; state.ballIndex = 0; state.progress = 0; state.aim = 0;
      game.dataset.phase = 'ready';
      recordForm.hidden = true; submitStatus.textContent = '';
      recordButton.hidden = false; recordButton.disabled = false; initialsInput.readOnly = false;
      resultFlash.textContent = ''; resultFlash.dataset.state = 'idle';
      setText(deliveryText, 'Today’s six are waiting.');
      setText(statusText, 'Pick a gap. Time the swing.');
      startButton.hidden = false; startButton.textContent = 'Take guard';
      ballMarks.forEach(function (item) { item.textContent = '–'; item.dataset.state = 'waiting'; });
      scorebook(); aimGuide();
      ball.style.opacity = '0'; ballShadow.style.opacity = '0';
    }

    function startOver() {
      audioContext();
      resetOver();
      state.phase = 'playing'; game.dataset.phase = 'playing';
      startButton.hidden = true;
      field.focus({ preventScroll: true });
      state.timer = setTimeout(nextBall, state.noMotion ? 120 : 430);
    }

    function nextBall() {
      if (!state.open || state.phase !== 'playing') return;
      if (state.ballIndex >= 6 || state.wickets >= 2) { finishOver(); return; }
      ball.getAnimations().forEach(function (animation) { animation.cancel(); });
      resultFlash.getAnimations().forEach(function (animation) { animation.cancel(); });
      var delivery = state.deliveries[state.ballIndex];
      state.deliveryRunning = true; state.swung = false; state.progress = 0;
      ball.removeAttribute('data-bounced');
      ball.classList.add('is-live'); ballShadow.classList.add('is-live'); bowler.classList.add('is-delivering');
      setText(deliveryText, (state.ballIndex + 1) + ' of 6 · ' + delivery.label);
      setText(statusText, state.ballIndex === 0 ? 'Watch the bounce.' : 'Ball on its way.');
      resultFlash.dataset.state = 'idle';
      renderBall(0, delivery);
      var started = performance.now();
      function frame(now) {
        if (!state.deliveryRunning) return;
        state.progress = engine.clamp((now - started) / delivery.duration, 0, 1);
        renderBall(state.progress, delivery);
        if (state.progress < 1) state.raf = requestAnimationFrame(frame);
        else playResult(null);
      }
      state.raf = requestAnimationFrame(frame);
    }

    function batSwing(keyboard) {
      if (state.noMotion || keyboard) return;
      var portrait = isPortrait();
      var rest = portrait ? 'translate(-50%,-50%) rotate(' + (state.aim * 3.5) + 'deg)' : 'translate(-50%,-50%) rotate(' + (90 + state.aim * 3.5) + 'deg)';
      var follow = portrait ? 'translate(-50%,-55%) rotate(' + (-25 + state.aim * 13) + 'deg)' : 'translate(-48%,-55%) rotate(' + (65 + state.aim * 13) + 'deg)';
      batter.animate([
        { transform: rest },
        { transform: follow, offset: .62 },
        { transform: rest }
      ], { duration: 310, easing: 'cubic-bezier(.2,.8,.2,1)' });
    }

    function hitFlight(result) {
      if (state.noMotion || result.wicket || result.runs === 0) return;
      var point = geometry(state.progress, state.deliveries[state.ballIndex]);
      var portrait = point.portrait;
      var target = portrait ? { x: .5 + state.aim * .46, y: .04 } : { x: .03, y: .5 + state.aim * .45 };
      var start = ballTransform(point, 1.08);
      var end = ballTransform(target, result.runs >= 4 ? .7 : .82);
      ball.animate([
        { transform: start, opacity: 1 },
        { transform: end, opacity: result.runs >= 4 ? .25 : .55 }
      ], { duration: result.runs >= 4 ? 620 : 430, easing: 'cubic-bezier(.23,1,.32,1)', fill: 'forwards' });
    }

    function flashResult(result) {
      if (!result.wicket && result.runs < 4) {
        resultFlash.textContent = ''; resultFlash.dataset.state = 'idle';
        return;
      }
      resultFlash.textContent = result.mark;
      resultFlash.dataset.state = result.wicket ? 'wicket' : result.runs >= 4 ? 'boundary' : 'played';
      if (!state.noMotion) {
        resultFlash.animate([
          { opacity: 0, transform: 'translate3d(0,4px,0) scale(.96)' },
          { opacity: 1, transform: 'translate3d(0,0,0) scale(1)' }
        ], { duration: 180, easing: 'cubic-bezier(.23,1,.32,1)', fill: 'both' });
      }
    }

    function playResult(swing) {
      if (!state.deliveryRunning) return;
      state.deliveryRunning = false;
      cancelAnimationFrame(state.raf);
      bowler.classList.remove('is-delivering');
      var delivery = state.deliveries[state.ballIndex];
      var normalized = swing || { t: null, aim: state.aim };
      var result = engine.scoreDelivery(delivery, normalized);
      state.swings.push(normalized);
      state.results.push(result);
      state.score += result.runs;
      if (result.wicket) state.wickets++;
      scorebook(); flashResult(result);
      setText(statusText, result.call);
      if (result.wicket) {
        sound('wicket'); stumps.dataset.state = 'hit';
      } else if (result.runs >= 4) sound('middle');
      else if (result.runs > 0) sound('edge');
      hitFlight(result);
      state.ballIndex++;
      var over = state.ballIndex >= 6 || state.wickets >= 2;
      state.timer = setTimeout(function () {
        stumps.dataset.state = 'set';
        ball.classList.remove('is-live'); ballShadow.classList.remove('is-live');
        if (over) finishOver(); else nextBall();
      }, state.noMotion ? 360 : 980);
    }

    function swing(keyboard) {
      if (!state.deliveryRunning || state.swung) return;
      state.swung = true;
      batSwing(Boolean(keyboard));
      playResult({ t: Number(state.progress.toFixed(4)), aim: Number(state.aim.toFixed(4)) });
    }

    function roundSummary() {
      if (state.score === 0) return 'The pitch won that one.';
      if (state.score < 10) return 'A few gaps, a few lessons.';
      if (state.score < 20) return 'A useful little over.';
      if (state.score < 28) return 'That belongs in the scorebook.';
      return 'That was outrageous.';
    }

    function finishOver() {
      clearPlay(); state.phase = 'over'; game.dataset.phase = 'over';
      resultFlash.textContent = ''; resultFlash.dataset.state = 'idle';
      setText(deliveryText, state.results.map(function (result) { return result.mark; }).join(' · '));
      setText(statusText, roundSummary());
      startButton.hidden = false; startButton.textContent = 'Face another over';
      if (state.score > state.personalBest) {
        state.personalBest = state.score; storeSet('last-over-pb', state.score); updateRecords();
      }
      var dailyScore = state.dailyBest ? state.dailyBest.score : -1;
      if (state.storage === 'blob' && state.token && state.score > 0 && state.score > dailyScore) {
        recordForm.hidden = false;
        initialsInput.value = storeGet('last-over-initials', 'RG');
        initialsInput.focus({ preventScroll: true });
      }
    }

    function submitRecord(event) {
      event.preventDefault();
      var initials = String(initialsInput.value || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 3);
      if (!initials) { submitStatus.textContent = 'Add one to three initials.'; initialsInput.focus(); return; }
      storeSet('last-over-initials', initials);
      recordButton.disabled = true; submitStatus.textContent = 'Writing it into the book…';
      fetch('/api/cricket-score', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ date: state.date, token: state.token, initials: initials, swings: state.swings })
      }).then(function (response) { return response.json().then(function (data) { return { ok: response.ok, data: data }; }); })
        .then(function (response) {
          if (!response.ok) throw new Error(response.data.error || 'Could not save the record');
          state.dailyBest = response.data.dailyBest || state.dailyBest;
          state.allTimeBest = response.data.allTimeBest || state.allTimeBest;
          updateRecords(); sound('record');
          submitStatus.textContent = response.data.accepted ? 'Record claimed. That score now belongs to you.' : 'Someone got there first. Your personal best is safe.';
          recordButton.hidden = true; initialsInput.readOnly = true;
        }).catch(function () {
          submitStatus.textContent = 'Your personal best is safe. The global book is offline.';
          recordButton.disabled = false;
        });
    }

    function toggleSound() {
      state.sound = !state.sound; storeSet('last-over-sound', state.sound ? 'on' : 'off');
      soundButton.setAttribute('aria-pressed', String(state.sound));
      soundButton.setAttribute('aria-label', state.sound ? 'Mute game sounds' : 'Turn on game sounds');
      soundButton.title = state.sound ? 'Mute sounds' : 'Turn on sounds';
      if (state.sound) { audioContext(); sound('bounce'); }
    }

    function open(openOptions) {
      if (state.open) return;
      state.open = true;
      state.noMotion = reduceMotion || Boolean(openOptions && openOptions.keyboard);
      game.dataset.motion = state.noMotion ? 'reduced' : 'full';
      game.hidden = false;
      footer.classList.add('cricket-open');
      trigger.setAttribute('aria-expanded', 'true');
      requestAnimationFrame(function () { game.dataset.state = 'open'; });
      resetOver(); loadChallenge();
      game.scrollIntoView({ block: 'start' });
      setTimeout(function () { startButton.focus({ preventScroll: true }); }, state.noMotion ? 0 : 190);
    }

    function close() {
      if (!state.open) return;
      state.open = false; clearPlay(); game.dataset.state = 'closed';
      trigger.setAttribute('aria-expanded', 'false');
      setTimeout(function () {
        game.hidden = true; footer.classList.remove('cricket-open'); resetOver(); trigger.focus({ preventScroll: true });
      }, state.noMotion ? 0 : 180);
    }

    field.addEventListener('pointermove', function (event) {
      if (event.pointerType === 'mouse' || event.pointerType === 'pen') updateAim(event.clientX, event.clientY);
    });
    field.addEventListener('pointerdown', function (event) {
      if (!state.deliveryRunning) return;
      updateAim(event.clientX, event.clientY);
      swing(false);
    });
    game.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') { event.preventDefault(); close(); return; }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        state.aim = engine.clamp(state.aim + (event.key === 'ArrowLeft' ? -.14 : .14), -1, 1);
        aimGuide();
      }
      if ((event.key === ' ' || event.key === 'Enter') && document.activeElement === field) {
        event.preventDefault(); swing(true);
      }
    });
    startButton.addEventListener('click', startOver);
    closeButton.addEventListener('click', close);
    soundButton.addEventListener('click', toggleSound);
    recordForm.addEventListener('submit', submitRecord);
    initialsInput.addEventListener('input', function () {
      initialsInput.value = initialsInput.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 3);
    });
    document.addEventListener('visibilitychange', function () {
      if (!state.open) return;
      if (document.hidden && state.deliveryRunning) {
        clearPlay(); state.paused = true;
        setText(statusText, 'Paused. Take guard again.');
      } else if (!document.hidden && state.paused && state.phase === 'playing') {
        state.paused = false;
        state.timer = setTimeout(nextBall, 450);
      }
    });
    if ('ResizeObserver' in root) new ResizeObserver(aimGuide).observe(field);

    soundButton.setAttribute('aria-pressed', String(state.sound));
    updateRecords(); scorebook(); aimGuide();
    return { open: open, close: close };
  }

  root.FooterCricket = {
    mount: function (options) {
      if (!mounted) mounted = createGame(options);
      mounted.open({ keyboard: Boolean(options.keyboard) });
    },
    open: function (options) { if (mounted) mounted.open(options); },
    close: function () { if (mounted) mounted.close(); }
  };
})(window);
