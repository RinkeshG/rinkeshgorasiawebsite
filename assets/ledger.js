/* THE LEDGER — behaviours. Everything here degrades to nothing. */
(function () {
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* figures tally up like ledger entries when they enter view */
  if (!reduced && 'IntersectionObserver' in window) {
    var els = document.querySelectorAll('.fig b, .exp-fig b');
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

  /* the cat on the writing rule picks its own pose, answers when poked */
  var cat = document.getElementById('cat');
  if (cat) {
    var poses = ['sit', 'loaf', 'sleep'];
    cat.classList.add(poses[Math.floor(Math.random() * poses.length)]);
    cat.addEventListener('click', function () {
      cat.classList.add('mrrp');
      clearTimeout(cat._t);
      cat._t = setTimeout(function () { cat.classList.remove('mrrp'); }, 1500);
    });
  }

  /* the clock in the top bar keeps Bengaluru time */
  var clock = document.getElementById('h-clock');
  if (clock) {
    var tick = function () {
      var ist = new Date(Date.now() + (330 + new Date().getTimezoneOffset()) * 60000);
      clock.textContent = String(ist.getHours()).padStart(2, '0') + ':' +
                          String(ist.getMinutes()).padStart(2, '0') + ' IST';
    };
    tick();
    setInterval(tick, 30000);
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
    roll.addEventListener('click', function (e) {
      e.preventDefault();
      if (roll.classList.contains('rolling')) return;
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
    var parts = document.querySelectorAll('.row, .exp, .post, .next-entry');
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

  /* simba the inhabitant — walks across when you go quiet */
  var walker = document.getElementById('walker');
  if (walker && !reduced) {
    var idleT = null, lastWalk = 0;
    var arm = function () {
      clearTimeout(idleT);
      idleT = setTimeout(function () {
        if (Date.now() - lastWalk < 240000) return;   /* naps between strolls */
        if (document.hidden) return;
        lastWalk = Date.now();
        walker.classList.add('go');
        setTimeout(function () { walker.classList.remove('go'); }, 14500);
      }, 30000);
    };
    ['scroll', 'mousemove', 'keydown', 'touchstart'].forEach(function (ev) {
      addEventListener(ev, arm, { passive: true });
    });
    arm();
  }

  /* the sunflower is heliotropic — its head follows the light (your cursor) */
  var sf = document.querySelector('.sunflower');
  if (sf) {
    var head = sf.querySelector('.sf-head');
    var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reduced || !fine || !head) {
      if (!reduced) sf.classList.add('sway');   /* touch: it sways in the breeze instead */
    } else {
      var target = 0, cur = 0, raf = null;
      var step = function () {
        cur += (target - cur) * 0.09;
        head.style.transform = 'rotate(' + cur.toFixed(2) + 'deg)';
        if (Math.abs(target - cur) > 0.05) { raf = requestAnimationFrame(step); }
        else { raf = null; }
      };
      addEventListener('mousemove', function (e) {
        var r = sf.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;   /* off-screen: don't bother */
        var cx = r.left + r.width / 2, cy = r.top + r.height * 0.45;
        var deg = Math.atan2(e.clientX - cx, cy - e.clientY) * 180 / Math.PI;
        target = Math.max(-32, Math.min(32, deg));
        if (!raf) raf = requestAnimationFrame(step);
      }, { passive: true });
      addEventListener('mouseout', function (e) {
        if (!e.relatedTarget) { target = 0; if (!raf) raf = requestAnimationFrame(step); }
      });
    }
  }
})();
