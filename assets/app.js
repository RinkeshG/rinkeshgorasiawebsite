/* Rinkesh Gorasia — v2 */
if (location.search.indexOf('dark') > -1) document.documentElement.setAttribute('data-theme','dark');

document.addEventListener('DOMContentLoaded', function () {

  /* live Bengaluru time + temperature */
  var clock = document.getElementById('clock');
  if (clock) {
    function tick(){
      try {
        var t = new Date().toLocaleTimeString('en-US',{timeZone:'Asia/Kolkata',hour:'numeric',minute:'2-digit'});
        clock.dataset.time = 'Bengaluru · ' + t;
        clock.innerHTML = clock.dataset.time + (clock.dataset.temp || '');
      } catch(e){ clock.textContent = 'Bengaluru'; }
    }
    tick(); setInterval(tick, 20000);
    fetch('https://api.open-meteo.com/v1/forecast?latitude=12.97&longitude=77.59&current_weather=true')
      .then(function(r){return r.json();})
      .then(function(d){ if(d&&d.current_weather){ clock.dataset.temp=' · '+Math.round(d.current_weather.temperature)+'°'; tick(); }})
      .catch(function(){});
  }

  /* theme toggle */
  var btn = document.getElementById('theme'), root = document.documentElement;
  function paintIcon(){
    var ic = document.getElementById('theme-icon'); if(!ic) return;
    ic.innerHTML = root.getAttribute('data-theme')==='dark'
      ? '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'
      : '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/>';
  }
  paintIcon();
  if (btn) btn.addEventListener('click', function(){
    root.setAttribute('data-theme', root.getAttribute('data-theme')==='dark' ? 'light' : 'dark');
    paintIcon();
  });

  /* relative "updated" stamp */
  var upd = document.querySelector('[data-updated]');
  if (upd) {
    var then = new Date(upd.getAttribute('data-updated')), now = new Date();
    var days = Math.round((now - then) / 864e5), s;
    if (days <= 0) s = 'updated today';
    else if (days === 1) s = 'updated yesterday';
    else if (days < 14) s = 'updated ' + days + ' days ago';
    else if (days < 60) s = 'updated ' + Math.round(days/7) + ' weeks ago';
    else s = 'updated ' + Math.round(days/30) + ' months ago';
    upd.textContent = s;
  }

  /* the wave */
  var w = document.getElementById('wave');
  if (w) {
    function waveGo(){ w.classList.remove('go'); void w.offsetWidth; w.classList.add('go'); }
    w.addEventListener('click', waveGo);
    setTimeout(waveGo, 900);
  }

  /* Simba — deferred. Returns later as the real line-art cat (proper assets in hand). */

  /* easter egg — "the honest version": click the now label to flip the status */
  var nowLabel = document.querySelector('.now-label');
  if (nowLabel) {
    var nowWrap = nowLabel.closest('.now'), nowP = nowWrap && nowWrap.querySelector('p');
    if (nowP) {
      var realNow = nowP.textContent, flipped = false, hi = -1;
      var honest = [
        "actually: avoiding one hard decision by rebuilding this website.",
        "actually: four tabs deep in a rabbit hole i cannot justify.",
        "actually: calling 'one more commit' a plan.",
        "actually: letting Simba decide what's important today."
      ];
      nowLabel.style.cursor = 'pointer';
      nowLabel.title = 'the honest version';
      nowLabel.addEventListener('click', function(){
        flipped = !flipped;
        if (flipped){ hi = (hi+1) % honest.length; nowP.textContent = honest[hi]; nowLabel.textContent = 'actually'; }
        else { nowP.textContent = realNow; nowLabel.textContent = 'now'; }
      });
    }
  }

  /* easter egg — the graveyard remembers: click a buried project for its epitaph */
  document.querySelectorAll('[data-epitaph]').forEach(function(el){
    el.style.cursor = 'pointer';
    el.addEventListener('click', function(){
      var ex = el.querySelector('.epitaph');
      if (ex){ ex.remove(); return; }
      var p = document.createElement('p');
      p.className = 'epitaph';
      p.textContent = el.getAttribute('data-epitaph');
      el.appendChild(p);
    });
  });

  /* reveal as you scroll — gentle, once each */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('in'); });
  }

  console.log('%coh hey, you opened the console. 👀','font-size:14px;font-weight:600');
  console.log('%cbuilt by hand (well, with Claude). say hi → rinkeshgorasia@gmail.com','color:#b1502e');
});
