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

  /* the cat on the writing rule answers when poked */
  var cat = document.getElementById('cat');
  if (cat) {
    cat.addEventListener('click', function () {
      cat.classList.add('mrrp');
      clearTimeout(cat._t);
      cat._t = setTimeout(function () { cat.classList.remove('mrrp'); }, 1500);
    });
  }

  /* the footer clock knows the rhythm of the day (IST) */
  var live = document.getElementById('f-live');
  if (live) {
    var ist = new Date(Date.now() + (330 + new Date().getTimezoneOffset()) * 60000);
    var hr = ist.getHours();
    var mood =
      hr < 6  ? 'ASLEEP. SIMBA ISN\u2019T.' :
      hr < 9  ? 'FIRST FILTER COFFEE' :
      hr < 13 ? 'BUILDING' :
      hr < 16 ? 'THIRD COFFEE, FIGHTING THE SLUMP' :
      hr < 19 ? 'STILL BUILDING' :
      hr < 22 ? 'GAME NIGHT \u2014 HOSTING, LOSING' :
                'LEGO O\u2019CLOCK';
    var hh = String(hr).padStart(2, '0'), mm = String(ist.getMinutes()).padStart(2, '0');
    live.textContent = 'BENGALURU \u00B7 ' + hh + ':' + mm + ' \u00B7 ' + mood;
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
