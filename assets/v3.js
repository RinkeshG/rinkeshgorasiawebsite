(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* logo fallback — a broken/missing mark hides itself so the letter monogram behind
     it shows. delegated (capture, since 'error' doesn't bubble) instead of inline
     onerror, so it survives a strict CSP and lives in one place. */
  document.addEventListener('error',function(e){
    var t=e.target;
    if(t&&t.tagName==='IMG'&&t.closest&&(t.closest('.lmark')||t.closest('.case-id .mark'))){ t.style.display='none'; }
  },true);

  /* live clock — plain text, no day/night glyph */
  var el=document.getElementById('clock');
  function tick(){if(!el)return;try{var t=new Date().toLocaleTimeString('en-US',{timeZone:'Asia/Kolkata',hour:'numeric',minute:'2-digit'});el.textContent='Bengaluru · '+t;}catch(e){el.textContent='Bengaluru';}}
  tick();setInterval(tick,15000);

  /* disclosure (works wherever .rec exists) */
  document.querySelectorAll('.rec .summary').forEach(function(btn){
    btn.addEventListener('click',function(){
      var rec=btn.closest('.rec'),prev=rec.querySelector('.prev');
      var open=!rec.classList.contains('open');
      if(open){rec.classList.add('open');prev.style.maxHeight=prev.scrollHeight+'px';}
      else{rec.classList.remove('open');prev.style.maxHeight='0';}
      btn.setAttribute('aria-expanded',open?'true':'false');
    });
  });

  /* scroll reveal */
  var blocks=document.querySelectorAll('.reveal');
  if(reduce||!('IntersectionObserver' in window)){blocks.forEach(function(b){b.classList.add('in');});}
  else{var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.1,rootMargin:'0px 0px -8% 0px'});blocks.forEach(function(b){io.observe(b);});}

  /* simba + wave (home only; guarded) */
  var photo=document.getElementById('photo'),bubble=document.getElementById('bubble'),wave=document.getElementById('wave');
  var hellos=['mrrp. hi.','purr. (he\'s hireable, btw)','meow. feed me first.','oh, you again. i like you.','sup, human. 🐾','i run this place.'];
  var hi=0,bt;
  var waveKf=[{transform:'rotate(0deg)'},{transform:'rotate(16deg)',offset:.15},{transform:'rotate(-9deg)',offset:.3},{transform:'rotate(16deg)',offset:.45},{transform:'rotate(-5deg)',offset:.6},{transform:'rotate(9deg)',offset:.75},{transform:'rotate(0deg)'}];
  function doWave(){if(reduce||!wave||!wave.animate)return;try{wave.animate(waveKf,{duration:1300,easing:'ease'});}catch(e){}}
  function sayHi(persist){if(bubble){bubble.textContent=hellos[hi%hellos.length];hi++;}doWave();if(persist&&bubble){bubble.classList.add('show');clearTimeout(bt);bt=setTimeout(function(){bubble.classList.remove('show');},2200);}}
  if(photo){photo.addEventListener('mouseenter',function(){sayHi(false);});}

  /* command palette (injected on every page) — uses the shared toast defined below */
  var overlay=document.createElement('div');overlay.className='cmdk';overlay.id='cmdk';overlay.setAttribute('aria-hidden','true');
  overlay.innerHTML='<div class="cmdk-box" role="dialog" aria-label="Quick actions"><input class="cmdk-input" id="cmdk-input" placeholder="type a command... try \'sniff\', \'email\', or \'resume\'" autocomplete="off" spellcheck="false" /><ul class="cmdk-list" id="cmdk-list"></ul><div class="cmdk-foot"><span>↑ ↓ navigate</span><span>↵ select</span><span>esc close</span></div></div>';
  document.body.appendChild(overlay);

  var actions=[
    {l:'email rinkesh',h:'↵',k:'email contact mail hi say',run:function(){location.href='mailto:rinkeshgorasia@gmail.com';}},
    {l:'copy email address',h:'clipboard',k:'copy email address clipboard',run:function(){if(navigator.clipboard){navigator.clipboard.writeText('rinkeshgorasia@gmail.com');}toast('email copied to clipboard');}},
    {l:'home',h:'↗',k:'home index',run:function(){location.href='index.html';}},
    {l:'work, the long version',h:'↗',k:'work career story',run:function(){location.href='work.html';}},
    {l:'writing',h:'↗',k:'writing essays notes',run:function(){location.href='writing.html';}},
    {l:'the shelf',h:'🃏',k:'shelf deck books board games lego coffee cards collectibles stuff off the clock',run:function(){location.href='shelf.html';}},
    {l:'the coffee crawl',h:'☕',k:'coffee cafe bengaluru crawl filter',run:function(){location.href='coffee.html';}},
    {l:'open Sniff',h:'↗ sniff.fyi',k:'sniff pet food product',run:function(){window.open('https://sniff.fyi','_blank');}},
    {l:'open KnowYourPay',h:'↗ knowyourpay',k:'knowyourpay pay salary underpaid product',run:function(){window.open('https://knowyourpay.in','_blank');}},
    {l:'open Product Sense Lab',h:'↗ productsenselab.com',k:'product sense lab pm interview product',run:function(){window.open('https://www.productsenselab.com','_blank');}},
    {l:'twitter',h:'↗ @rinks__g',k:'twitter x social',run:function(){window.open('https://x.com/rinks__g','_blank');}},
    {l:'linkedin',h:'↗ in/rinksg',k:'linkedin social',run:function(){window.open('https://www.linkedin.com/in/rinksg/','_blank');}},
    {l:'say hi to Simba',h:'🐾',k:'simba cat pet fun hi meow',run:function(){closeK();if(photo){photo.scrollIntoView({block:'center',behavior:'smooth'});setTimeout(function(){sayHi(true);},260);}else{location.href='index.html';}}}
  ];
  var cmdk=overlay,input=document.getElementById('cmdk-input'),list=document.getElementById('cmdk-list'),sel=0,view=actions.slice();
  function render(){list.innerHTML='';view.forEach(function(a,i){var li=document.createElement('li');li.className=i===sel?'sel':'';li.innerHTML='<span>'+a.l+'</span><span class="h">'+a.h+'</span>';li.addEventListener('mousemove',function(){if(sel!==i){sel=i;render();}});li.addEventListener('click',function(){run(i);});list.appendChild(li);});}
  function filter(){var q=input.value.trim().toLowerCase();view=q?actions.filter(function(a){return (a.l+' '+a.k).toLowerCase().indexOf(q)>=0;}):actions.slice();sel=0;render();}
  function run(i){var a=view[i];if(a){closeK();a.run();}}
  var lastFocus=null;
  function openK(){lastFocus=document.activeElement;cmdk.classList.add('open');cmdk.setAttribute('aria-hidden','false');input.value='';filter();setTimeout(function(){input.focus();},20);}
  function closeK(){cmdk.classList.remove('open');cmdk.setAttribute('aria-hidden','true');if(lastFocus&&lastFocus.focus){try{lastFocus.focus();}catch(e){}}lastFocus=null;}
  document.addEventListener('keydown',function(e){
    if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();cmdk.classList.contains('open')?closeK():openK();return;}
    if(!cmdk.classList.contains('open'))return;
    if(e.key==='Escape'){closeK();}
    else if(e.key==='Tab'){e.preventDefault();input.focus();} /* trap: input is the only focusable; arrows drive the list */
    else if(e.key==='ArrowDown'){e.preventDefault();sel=Math.min(sel+1,view.length-1);render();}
    else if(e.key==='ArrowUp'){e.preventDefault();sel=Math.max(sel-1,0);render();}
    else if(e.key==='Enter'){e.preventDefault();run(sel);}
  });
  input.addEventListener('input',filter);
  cmdk.addEventListener('click',function(e){if(e.target===cmdk)closeK();});
  var openBtn=document.getElementById('openk');if(openBtn)openBtn.addEventListener('click',openK);
  render();

  /* footer — rebuilt once: shelf note, social icons, credit, ⌘K */
  var foot=document.querySelector('.foot');
  if(foot && !foot.dataset.built){
    foot.dataset.built='1';
    var I_MAIL='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7.5 8 5 8-5"/></svg>';
    var I_X='<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.66l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.04l12.04 15.64Z"/></svg>';
    var I_IN='<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z"/></svg>';
    foot.innerHTML=''
      +'<div class="foot-row">'
      +  '<a class="foot-shelf" href="shelf.html"><svg class="fs-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/></svg>the shelf <span class="ar">↗</span></a>'
      +  '<span class="foot-sig">built by rinkesh, fuelled by <a href="coffee.html">coffee</a></span>'
      +  '<div class="foot-right">'
      +    '<button type="button" class="kbar" id="footk" title="quick actions" aria-label="open quick actions (Command K)">⌘K</button>'
      +    '<div class="foot-social">'
      +      '<a href="mailto:rinkeshgorasia@gmail.com" aria-label="Email">'+I_MAIL+'</a>'
      +      '<a href="https://x.com/rinks__g" target="_blank" rel="noopener" aria-label="Twitter / X">'+I_X+'</a>'
      +      '<a href="https://www.linkedin.com/in/rinksg/" target="_blank" rel="noopener" aria-label="LinkedIn">'+I_IN+'</a>'
      +    '</div>'
      +  '</div>'
      +'</div>';
    var fk=document.getElementById('footk');if(fk)fk.addEventListener('click',openK);
  }

  /* "open to work" — the pitch, revealed by clicking the nav status (or via ⌘K).
     dark/engineered take on the classic "what i'm looking for" card. */
  (function(){
    var box=document.createElement('div');box.className='opps';box.id='opps';box.setAttribute('aria-hidden','true');
    box.innerHTML='<div class="opps-box" role="dialog" aria-modal="true" aria-label="what i’m looking for">'
      +'<button class="opps-x" id="opps-x" type="button" aria-label="close">✕</button>'
      +'<div class="opps-head"><span class="opps-hi" aria-hidden="true">👋</span><div><span class="opps-k">// open to work</span><h2 class="opps-title">what i’m looking for</h2></div></div>'
      +'<div class="opps-body">'
      +'<p>i want a founding product role at an early team. building the thing, not managing a roadmap for someone else to build.</p>'
      +'<p>i’ve carried the whole weight once already. i took my first company to profitable and an acquisition with <span class="hl">no sales team</span>, entirely word of mouth, so i can build something good enough that people pass it on, without burning cash i don’t have.</p>'
      +'<p>i also know when to walk away. i shut my second company down myself while it still looked healthy, because the economics never worked. i’ll treat your runway like my own, because it has been.</p>'
      +'<p>and i <span class="hl">still build with my hands</span>, shipping products solo with AI right now, so you’re not hiring someone who’s forgotten how the work gets done. i’m in Bengaluru, will move for the right team, and the title doesn’t matter to me. a real 0→1 does.</p>'
      +'</div>'
      +'<div class="opps-foot">'
      +'<a class="btn-primary" href="mailto:rinkeshgorasia@gmail.com">copy my email</a>'
      +'<a class="btn-ghost" href="https://x.com/rinks__g" target="_blank" rel="noopener">DM on X</a>'
      +'<a class="opps-link" href="work.html">see the work →</a>'
      +'</div></div>';
    document.body.appendChild(box);
    var lastF=null;
    function openOpps(){ try{closeK();}catch(e){} lastF=document.activeElement; box.classList.add('open'); box.setAttribute('aria-hidden','false'); setTimeout(function(){var x=document.getElementById('opps-x'); if(x)x.focus();},20); }
    function closeOpps(){ box.classList.remove('open'); box.setAttribute('aria-hidden','true'); if(lastF&&lastF.focus){try{lastF.focus();}catch(e){}} lastF=null; }
    document.getElementById('opps-x').addEventListener('click',closeOpps);
    box.addEventListener('click',function(e){ if(e.target===box) closeOpps(); });
    box.addEventListener('keydown',function(e){
      if(e.key==='Escape'){ closeOpps(); return; }
      if(e.key!=='Tab') return;
      var f=box.querySelectorAll('button,a[href]'); if(!f.length) return;
      var first=f[0], last=f[f.length-1];
      if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
    });
    /* trigger: the "open to ... roles" nav status becomes a button (skip the coffee status) */
    Array.prototype.forEach.call(document.querySelectorAll('.bar .status'),function(s){
      if(!/open to/i.test(s.textContent)) return;
      s.setAttribute('role','button'); s.setAttribute('tabindex','0'); s.title='what i’m looking for';
      s.addEventListener('click',openOpps);
      s.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openOpps(); } });
    });
    /* and a ⌘K entry */
    actions.push({l:'what i’m looking for',h:'open to work',k:'open to work opportunities hiring role looking for job 0→1 founder available',run:openOpps});
  })();

  /* email CTAs copy the address + toast instead of a jarring mailto handoff.
     opt a link out with data-mailto to keep native behaviour. */
  var toastEl,toastT;
  function toast(msg){
    if(!toastEl){ toastEl=document.createElement('div'); toastEl.className='toast'; document.body.appendChild(toastEl); }
    toastEl.innerHTML='<svg class="tk" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span>'+msg+'</span>';
    clearTimeout(toastT); requestAnimationFrame(function(){ toastEl.classList.add('in'); });
    toastT=setTimeout(function(){ toastEl.classList.remove('in'); },2600);
  }
  function legacyCopy(txt){ return new Promise(function(res,rej){ try{ var t=document.createElement('textarea'); t.value=txt; t.style.position='fixed'; t.style.opacity='0'; document.body.appendChild(t); t.select(); var done=document.execCommand('copy'); document.body.removeChild(t); done?res():rej(); }catch(err){ rej(err); } }); }
  function copyText(txt){ return (navigator.clipboard&&navigator.clipboard.writeText) ? navigator.clipboard.writeText(txt).catch(function(){ return legacyCopy(txt); }) : legacyCopy(txt); }
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href^="mailto:"]'); if(!a||a.hasAttribute('data-mailto')) return;
    e.preventDefault();
    var email=a.getAttribute('href').replace(/^mailto:/i,'').split('?')[0];
    copyText(email).then(function(){ toast('copied '+email); }, function(){ toast(email); });
  });

  /* page-aware work close: book + CV light up once their links exist.
     drop the two URLs in and the buttons appear; until then, email leads. */
  var CAL_URL='';            /* e.g. 'https://cal.com/rinkesh/15min' */
  var CV_URL='';             /* e.g. 'resume.html' */
  (function(){
    var book=document.querySelector('[data-book]');
    if(book){
      if(CAL_URL){ book.href=CAL_URL; book.removeAttribute('hidden'); }
      else { var em=document.querySelector('.email-act'); if(em){ em.classList.remove('btn-ghost'); em.classList.add('btn-primary'); } }
    }
    var cv=document.querySelector('[data-cv]');
    if(cv&&CV_URL){ cv.href=CV_URL; cv.removeAttribute('hidden'); }
  })();

  /* reading progress (article pages only) — rAF-batched; layout read cached, only
     recomputed on resize, never on the scroll hot path. */
  if(document.querySelector('.artwrap')){
    var bar=document.createElement('div');bar.className='progress';document.body.appendChild(bar);
    var maxScroll=0,pframe=0;
    function measure(){maxScroll=document.documentElement.scrollHeight-window.innerHeight;}
    function paint(){pframe=0;bar.style.width=(maxScroll>0?Math.min(100,(window.scrollY/maxScroll)*100):0)+'%';}
    function prog(){if(!pframe)pframe=requestAnimationFrame(paint);}
    measure();paint();
    window.addEventListener('scroll',prog,{passive:true});
    window.addEventListener('resize',function(){measure();prog();});
  }

  /* ── Simba crosses ──────────────────────────────────────────────
     the cat already lives on this site (the portrait, the mrrp, the 404
     blames him). so once, after you've gone still for a while, he pads
     across the screen — the 3am-with-a-cat tax every builder knows.
     once per visit, idle-triggered, never on a tap. */
  (function(){
    if(reduce) return;
    var PAW='<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><circle cx="6" cy="9" r="2"/><circle cx="11" cy="6.5" r="2"/><circle cx="16.5" cy="8" r="2"/><path d="M11.5 11c-3 0-5.5 2-5.5 4.6 0 1.8 1.7 2.7 2.8 2 .9-.6 1-1 2.7-1s1.8.4 2.7 1c1.1.7 2.8-.2 2.8-2 0-2.6-2.5-4.6-5.5-4.6z"/></svg>';
    var done=false, idle, evs=['mousemove','scroll','keydown','touchstart','pointerdown'];
    function step(x,y,rot,delay){
      var s=document.createElement('span');
      s.innerHTML=PAW;
      s.style.cssText='position:fixed;left:'+x+'px;top:'+y+'px;z-index:120;pointer-events:none;color:var(--accentdim);opacity:0;transform:rotate('+rot+'deg) scale(.6);transition:opacity .3s ease,transform .35s cubic-bezier(.2,.7,.2,1)';
      document.body.appendChild(s);
      setTimeout(function(){
        s.style.opacity='.55'; s.style.transform='rotate('+rot+'deg) scale(1)';
        setTimeout(function(){ s.style.opacity='0'; setTimeout(function(){ s.remove(); },450); },1400);
      },delay);
    }
    function disarm(){ clearTimeout(idle); evs.forEach(function(ev){ window.removeEventListener(ev, arm); }); }
    function walk(){
      if(done) return;
      if(document.hidden){ idle=setTimeout(walk, 32000); return; }  /* wait for a visible tab; keep listening */
      done=true; disarm();                                          /* one-shot easter egg → one-shot listeners */
      var w=innerWidth, h=innerHeight, n=8, x0=-26, y0=h*0.82, dx=(w+52)/n, dy=-(h*0.16)/n;
      for(var i=0;i<n;i++) step(x0+dx*i, y0+dy*i+(i%2?13:-13), 30, i*170);
    }
    function arm(){ if(done) return; clearTimeout(idle); idle=setTimeout(walk, 32000); }
    evs.forEach(function(ev){ window.addEventListener(ev, arm, {passive:true}); });
    arm();
  })();
})();
