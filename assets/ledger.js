/* THE LEDGER — behaviours. Everything here degrades to nothing. */
(function () {
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* the red thread — the margin line is inked in as far as you've read */
  var thread = document.querySelector('.thread');
  var wrap = document.querySelector('.wrap');
  if (thread && wrap && !reduced) {
    var ink = function () {
      var doc = document.documentElement;
      var p = (doc.scrollTop + window.innerHeight) / doc.scrollHeight;
      thread.style.height = Math.min(1, p) * wrap.offsetHeight + 'px';
    };
    addEventListener('scroll', ink, { passive: true });
    addEventListener('resize', ink, { passive: true });
    ink();
  }

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
})();
