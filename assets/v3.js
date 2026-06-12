(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* live clock */
  var el=document.getElementById('clock');
  function tick(){if(!el)return;try{var now=new Date();var t=now.toLocaleTimeString('en-US',{timeZone:'Asia/Kolkata',hour:'numeric',minute:'2-digit'});var h=parseInt(now.toLocaleString('en-US',{timeZone:'Asia/Kolkata',hour:'numeric',hour12:false}),10);var gl=(h>=6&&h<18)?'☀':'☾';el.innerHTML='Bengaluru · '+t+' <span class="gl">'+gl+'</span>';}catch(e){el.textContent='Bengaluru';}}
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

  /* toast */
  var toastEl=document.createElement('div');toastEl.className='toast';document.body.appendChild(toastEl);
  var tt;function toast(msg){toastEl.textContent=msg;toastEl.classList.add('show');clearTimeout(tt);tt=setTimeout(function(){toastEl.classList.remove('show');},1600);}

  /* command palette (injected on every page) */
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
    {l:'open KnowYourPay',h:'↗ knowyourpay',k:'knowyourpay pay salary underpaid product',run:function(){window.open('https://knowyourpay.vercel.app','_blank');}},
    {l:'open Product Sense Lab',h:'↗ productsenselab.com',k:'product sense lab pm interview product',run:function(){window.open('https://www.productsenselab.com','_blank');}},
    {l:'twitter',h:'↗ @rinks__g',k:'twitter x social',run:function(){window.open('https://x.com/rinks__g','_blank');}},
    {l:'linkedin',h:'↗ in/rinksg',k:'linkedin social',run:function(){window.open('https://www.linkedin.com/in/rinksg/','_blank');}},
    {l:'say hi to Simba',h:'🐾',k:'simba cat pet fun hi meow',run:function(){closeK();if(photo){photo.scrollIntoView({block:'center',behavior:'smooth'});setTimeout(function(){sayHi(true);},260);}else{location.href='index.html';}}}
  ];
  var cmdk=overlay,input=document.getElementById('cmdk-input'),list=document.getElementById('cmdk-list'),sel=0,view=actions.slice();
  function render(){list.innerHTML='';view.forEach(function(a,i){var li=document.createElement('li');li.className=i===sel?'sel':'';li.innerHTML='<span>'+a.l+'</span><span class="h">'+a.h+'</span>';li.addEventListener('mousemove',function(){if(sel!==i){sel=i;render();}});li.addEventListener('click',function(){run(i);});list.appendChild(li);});}
  function filter(){var q=input.value.trim().toLowerCase();view=q?actions.filter(function(a){return (a.l+' '+a.k).toLowerCase().indexOf(q)>=0;}):actions.slice();sel=0;render();}
  function run(i){var a=view[i];if(a){closeK();a.run();}}
  function openK(){cmdk.classList.add('open');cmdk.setAttribute('aria-hidden','false');input.value='';filter();setTimeout(function(){input.focus();},20);}
  function closeK(){cmdk.classList.remove('open');cmdk.setAttribute('aria-hidden','true');}
  document.addEventListener('keydown',function(e){
    if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();cmdk.classList.contains('open')?closeK():openK();return;}
    if(!cmdk.classList.contains('open'))return;
    if(e.key==='Escape'){closeK();}
    else if(e.key==='ArrowDown'){e.preventDefault();sel=Math.min(sel+1,view.length-1);render();}
    else if(e.key==='ArrowUp'){e.preventDefault();sel=Math.max(sel-1,0);render();}
    else if(e.key==='Enter'){e.preventDefault();run(sel);}
  });
  input.addEventListener('input',filter);
  cmdk.addEventListener('click',function(e){if(e.target===cmdk)closeK();});
  var openBtn=document.getElementById('openk');if(openBtn)openBtn.addEventListener('click',openK);
  render();

  /* footer credit, injected once */
  var foot=document.querySelector('.foot');
  if(foot && !foot.querySelector('.sig')){
    var sig=document.createElement('span');sig.className='sig';
    sig.innerHTML='built by rinkesh, fuelled by <a href="coffee.html">coffee</a> ☕';
    var fr=foot.querySelector('.fr');foot.insertBefore(sig, fr||null);
  }

  /* reading progress (article pages only) */
  if(document.querySelector('.artwrap')){
    var bar=document.createElement('div');bar.className='progress';document.body.appendChild(bar);
    function prog(){var h=document.documentElement.scrollHeight-window.innerHeight;bar.style.width=(h>0?Math.min(100,(window.scrollY/h)*100):0)+'%';}
    window.addEventListener('scroll',prog,{passive:true});window.addEventListener('resize',prog);prog();
  }
})();
