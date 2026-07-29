/* THE LEDGER — behaviours. Everything here degrades to nothing. */
(function () {
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Four compact editorial object marks sit inside the sign-off itself. They are
     one illustrated family, rather than four unrelated UI glyphs. Keeping the
     markup here gives every page the same footer without duplicating it. */
  var footer = document.querySelector('footer');
  var footIn = footer && footer.querySelector('.foot-in');
  if (footIn && !footIn.querySelector('.footer-marks')) {
    var marks = document.createElement('div');
    marks.className = 'footer-marks';
    marks.innerHTML = [
      '<span class="footer-mark footer-mark--giraffe" aria-hidden="true"><img src="assets/img/footer/giraffe.png" width="256" height="256" alt="" decoding="async"></span>',
      '<span class="footer-mark footer-mark--flower" aria-hidden="true"><img src="assets/img/footer/sunflower.png" width="256" height="256" alt="" decoding="async"></span>',
      '<span class="footer-mark footer-mark--die" aria-hidden="true"><img src="assets/img/footer/die.png" width="256" height="256" alt="" decoding="async"></span>',
      '<button class="footer-mark footer-mark--cricket footer-cricket-trigger" type="button" aria-expanded="false" aria-controls="footer-cricket-game" aria-label="Play The Last Over" title="Play The Last Over">' +
        '<img src="assets/img/footer/cricket.png" width="256" height="256" alt="" decoding="async">' +
        '<span class="footer-cricket-hint" aria-hidden="true">play the last over</span>' +
      '</button>'
    ].join('');
    footIn.insertBefore(marks, footIn.querySelector('.foot-nav'));

    /* The game is an earned surprise at the end of a page. Its engine, artwork
       and styles are intentionally absent from the normal page payload and load
       only after someone chooses the cricket mark. */
    var cricketTrigger = marks.querySelector('.footer-cricket-trigger');
    if (cricketTrigger) {
      var cricketLoading = false;
      var loadScript = function (src) {
        return new Promise(function (resolve, reject) {
          var existing = document.querySelector('script[data-cricket-src="' + src + '"]');
          if (existing) {
            if (existing.dataset.ready === 'true') resolve();
            else existing.addEventListener('load', resolve, { once: true });
            return;
          }
          var script = document.createElement('script');
          script.src = src; script.defer = true; script.dataset.cricketSrc = src;
          script.addEventListener('load', function () { script.dataset.ready = 'true'; resolve(); }, { once: true });
          script.addEventListener('error', reject, { once: true });
          document.head.appendChild(script);
        });
      };
      var loadStyle = function (href) {
        return new Promise(function (resolve, reject) {
          var existing = document.querySelector('link[data-cricket-style]');
          if (existing) { resolve(); return; }
          var link = document.createElement('link');
          link.rel = 'stylesheet'; link.href = href; link.dataset.cricketStyle = 'true';
          link.addEventListener('load', resolve, { once: true });
          link.addEventListener('error', reject, { once: true });
          document.head.appendChild(link);
        });
      };
      cricketTrigger.addEventListener('click', function (event) {
        var keyboard = event.detail === 0;
        if (window.FooterCricket) { window.FooterCricket.open({ keyboard: keyboard }); return; }
        if (cricketLoading) return;
        cricketLoading = true;
        cricketTrigger.setAttribute('aria-busy', 'true');
        Promise.all([
          loadStyle('assets/footer-cricket.css?v=3'),
          loadScript('assets/cricket-engine.js?v=3')
        ]).then(function () {
          return loadScript('assets/footer-cricket.js?v=3');
        }).then(function () {
          cricketLoading = false;
          cricketTrigger.removeAttribute('aria-busy');
          if (window.FooterCricket) window.FooterCricket.mount({ footer: footer, trigger: cricketTrigger, reduced: reduced, keyboard: keyboard });
        }).catch(function () {
          cricketLoading = false;
          cricketTrigger.removeAttribute('aria-busy');
          cricketTrigger.title = 'The Last Over could not load. Try again.';
        });
      });
    }

    /* The sign-off is encountered once, near the end of a page. A one-time,
       lightweight entrance adds recognition without leaving the footer in
       constant motion. Each object keeps its own small hover gesture below. */
    if (!reduced && 'IntersectionObserver' in window) {
      var marksIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          marks.classList.add('marks-in');
          marksIO.disconnect();
        });
      }, { threshold: 0.65 });
      marksIO.observe(marks);
    }
  }

  /* figures tally up like ledger entries when they enter view */
  if (!reduced && 'IntersectionObserver' in window) {
    var els = document.querySelectorAll('.fig b, .exp-fig b, .b-fig b');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var raw = e.target.textContent;
        var m = raw.match(/^([₹]?)(\d+(?:\.\d+)?)(.*)$/);
        if (!m || +m[2] === 0) return;
        var pre = m[1], target = +m[2], suf = m[3];
        var dec = (m[2].split('.')[1] || '').length;
        var t0 = performance.now();
        (function tick(now) {
          var k = Math.min(1, (now - t0) / 700);
          k = 1 - Math.pow(1 - k, 3);
          e.target.textContent = pre + (target * k).toFixed(dec) + suf;
          if (k < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.6 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* simba speaks — hover on desktop, tap on touch */
  var ph = document.querySelector('.ph-in');
  if (ph) {
    var lines = ['mrrp. hi.', 'prrb?', '*slow blink*', 'mrrp. (that means scroll on.)'];
    var i = 0;
    var bubble = ph.querySelector('.bubble');
    var speak = function () {
      if (bubble) { bubble.textContent = lines[i % lines.length]; i++; }
    };
    ph.addEventListener('mouseenter', speak);
    ph.addEventListener('click', function () {
      speak();
      ph.classList.add('mrrp');
      clearTimeout(ph._t);
      ph._t = setTimeout(function () { ph.classList.remove('mrrp'); }, 1800);
    });
  }


  /* the clock in the top bar keeps Bengaluru time */
  var clock = document.getElementById('h-clock');
  if (clock) {
    var tick = function () {
      var ist = new Date(Date.now() + (330 + new Date().getTimezoneOffset()) * 60000);
      clock.textContent = 'Bengaluru · ' + String(ist.getHours()).padStart(2, '0') + ':' +
                          String(ist.getMinutes()).padStart(2, '0') + ' IST';
    };
    tick();
    setInterval(tick, 30000);
  }

  /* the 0→1 availability note — click to see what I'm actually looking for.
     "write to me" copies the address rather than firing a mail client. */
  var availBtn = document.getElementById('avail-btn');
  var availPop = document.getElementById('avail-pop');
  if (availBtn && availPop) {
    var copyBtn = document.getElementById('ap-copy');
    if (copyBtn) {
      var legacyCopy = function (text) {
        try {
          var ta = document.createElement('textarea');
          ta.value = text; ta.setAttribute('readonly', '');
          ta.style.position = 'absolute'; ta.style.left = '-9999px';
          document.body.appendChild(ta); ta.select();
          document.execCommand('copy'); document.body.removeChild(ta);
        } catch (e) {}
      };
      copyBtn.addEventListener('click', function () {
        var email = copyBtn.getAttribute('data-email') || '';
        var prev = copyBtn.innerHTML;
        var flash = function () {
          copyBtn.innerHTML = '<span class="ok">copied ✓</span>';
          setTimeout(function () { copyBtn.innerHTML = prev; }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(flash, function () { legacyCopy(email); flash(); });
        } else { legacyCopy(email); flash(); }
      });
    }
    var availScrim = document.getElementById('avail-scrim');
    var availToggle = function (open) {
      var show = open == null ? !availPop.classList.contains('show') : open;
      availPop.classList.toggle('show', show);
      if (availScrim) availScrim.classList.toggle('show', show);
      document.body.classList.toggle('avail-open', show); /* scroll-lock behind the sheet (mobile only, via CSS) */
      availBtn.setAttribute('aria-expanded', String(show));
      /* desktop: the note opens downward, and near the footer that can land below the
         fold — nudge it fully into view so it's never something you have to scroll to find.
         the popover is always in layout (absolute, opacity-toggled), so we can measure now.
         (on mobile it's a fixed bottom sheet, already in view, so this is a no-op.) */
      if (show && !matchMedia('(max-width:640px)').matches) {
        var r = availPop.getBoundingClientRect();
        var over = r.bottom - (window.innerHeight || document.documentElement.clientHeight);
        if (over > 0) window.scrollBy({ top: over + 20, left: 0, behavior: reduced ? 'auto' : 'smooth' });
      }
    };
    availBtn.addEventListener('click', function (e) { e.stopPropagation(); availToggle(); });
    document.addEventListener('click', function (e) {
      if (!availPop.contains(e.target) && !availBtn.contains(e.target)) availToggle(false);
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') availToggle(false); });
  }

  /* the site faces the light — paper follows Bengaluru's sun */
  (function () {
    var ist = new Date(Date.now() + (330 + new Date().getTimezoneOffset()) * 60000);
    var hr = ist.getHours();
    var part = hr < 6 ? 'night' : hr < 9 ? 'dawn' : hr < 17 ? 'day' : hr < 20 ? 'dusk' : 'night';
    if (part !== 'day') document.documentElement.dataset.light = part;
  })();

  /* the die — six sides of me. roll to meet one; no teleporting. */
  var roll = document.getElementById('roll');
  var pop = document.getElementById('die-pop');
  if (roll && pop) {
    var sides = [
      'Builds best when the problem is still messy.',
      'Three filter coffees a day. Never espresso.',
      'Hosts game night. Loses game night.',
      'Once shut a company down while it still looked healthy.',
      'Grows sunflowers on the balcony.',
      'Simba supervises every line of this site.'
    ];
    var words = ['one', 'two', 'three', 'four', 'five', 'six'];
    var faceGlyph = ['\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685'];
    var faces = {
      1: [[12,12]], 2: [[7,7],[17,17]], 3: [[7,7],[12,12],[17,17]],
      4: [[7,7],[17,7],[7,17],[17,17]], 5: [[7,7],[17,7],[12,12],[7,17],[17,17]],
      6: [[7,7],[17,7],[7,12],[17,12],[7,17],[17,17]]
    };
    var pipsEl = roll.querySelector('.pips');
    var NS = 'http://www.w3.org/2000/svg';
    function drawPips(n) {
      while (pipsEl.firstChild) pipsEl.removeChild(pipsEl.firstChild);
      faces[n].forEach(function (p) {
        var c = document.createElementNS(NS, 'circle');
        c.setAttribute('cx', p[0]); c.setAttribute('cy', p[1]);
        c.setAttribute('r', '1.7'); c.setAttribute('class', 'pip');
        pipsEl.appendChild(c);
      });
    }
    var last = 5;
    /* before the first roll, hovering the die shows its own invitation
       ("roll me") — the affordance explains itself instead of a title tooltip.
       touch skips this: the first tap rolls, which is its own explanation. */
    var rolled = false;
    if (matchMedia('(hover: hover)').matches) {
      roll.addEventListener('mouseenter', function () { if (!rolled) pop.classList.add('show'); });
      roll.addEventListener('mouseleave', function () { if (!rolled) pop.classList.remove('show'); });
    }
    roll.addEventListener('click', function () {
      if (roll.classList.contains('rolling')) return;
      rolled = true;
      roll.classList.add('rolling');
      pop.classList.remove('show');
      var n; do { n = 1 + Math.floor(Math.random() * 6); } while (n === last);
      last = n;
      setTimeout(function () {
        roll.classList.remove('rolling');
        drawPips(n);
        pop.querySelector('.dp-num').textContent = 'you rolled a ' + words[n - 1];
        pop.querySelector('.dp-die').textContent = faceGlyph[n - 1];
        pop.querySelector('p').textContent = sides[n - 1];
        pop.classList.add('show');
      }, 520);
    });
    document.addEventListener('click', function (e) {
      if (!pop.contains(e.target) && !roll.contains(e.target)) pop.classList.remove('show');
    });
  }

  /* lego physics — the page assembles as you read */
  if (!reduced && 'IntersectionObserver' in window) {
    var parts = document.querySelectorAll('.row, .exp, .post');
    var snapIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); snapIO.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    parts.forEach(function (el) { el.classList.add('snap'); snapIO.observe(el); });
    /* insurance: nothing stays invisible if observers misbehave */
    setTimeout(function () {
      parts.forEach(function (el) { el.classList.add('in'); });
    }, 3500);
  }


})();
