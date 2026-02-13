(function(){
  const heartsRoot = document.getElementById('hearts');
  const revealBtn = document.getElementById('revealBtn');
  const messageCard = document.getElementById('messageCard');
  const messageText = document.getElementById('messageText');
  const messageTitle = document.getElementById('messageTitle');
  const toName = document.getElementById('toName');

  function makeHeart(x){
    const h = document.createElement('div');
    h.className = 'heart';
    h.style.left = x + 'px';
    const size = 12 + Math.random()*28;
    h.style.width = size + 'px';
    h.style.height = size + 'px';
    h.style.opacity = (0.6 + Math.random()*0.4).toFixed(2);
    h.style.transition = 'transform 0.3s linear';
    const duration = 4 + Math.random()*3;
    h.style.animation = `floatUp ${duration}s linear forwards`;
    const delay = Math.random()*0.6;
    h.style.top = (window.innerHeight + 20) + 'px';
    h.style.transform = 'rotate(-45deg)';
    heartsRoot.appendChild(h);
    setTimeout(()=>{h.remove()}, (duration+delay)*1000 + 800);
    return h;
  }

  function spawnRandomHeart(){
    const x = Math.random()*window.innerWidth;
    makeHeart(x);
  }

  function rainHearts(count = 80, spacing = 12){
    for(let n=0;n<count;n++) setTimeout(()=>makeHeart(Math.random()*window.innerWidth), n*spacing);
  }

  let autoInterval = setInterval(spawnRandomHeart, 600);

  // place user polaroid frames in background (fixed positions)
  const polaroidFiles = [
    'images/33301523-45F0-494A-AD2A-4FF0C8A7B983.JPG',
    'images/IMG_7972.jpg',
    'images/IMG_7983.jpg',
    'images/IMG_5428.jpg',
    'images/IMG_7240.jpg',
    'images/IMG_7261.jpg'
  ];

  const polaroidsRoot = document.createElement('div');
  polaroidsRoot.className = 'polaroids';
  // append as sibling of hearts and card so z-index layering works
  heartsRoot.parentElement.appendChild(polaroidsRoot);

  function placePolaroids(){
    // clear existing
    polaroidsRoot.innerHTML = '';
    const positions = [
      {left:4, top:10, rot:-8, size:160},
      {left:86, top:14, rot:6, size:140},
      {left:10, top:72, rot:-6, size:170},
      {left:80, top:68, rot:-5, size:150},
      {left:5, top:45, rot:8, size:145},
      {left:88, top:45, rot:-7, size:155}
    ];
    for(let i=0;i<polaroidFiles.length;i++){
      const file = polaroidFiles[i];
      const pos = positions[i%positions.length];
      const p = document.createElement('div');
      p.className = 'polaroid';
      p.style.left = pos.left + '%';
      p.style.top = pos.top + '%';
      p.style.setProperty('--rot', pos.rot + 'deg');
      const img = document.createElement('img');
      img.src = file;
      img.alt = 'polaroid';
      img.style.width = pos.size + 'px';
      p.appendChild(img);
      polaroidsRoot.appendChild(p);
    }
  }

  // initial placement and on resize (keeps percentages)
  placePolaroids();
  window.addEventListener('resize', placePolaroids);

  revealBtn.addEventListener('click', ()=>{
    const name = toName.value.trim();
    if(!name || name.toLowerCase() !== 'adrian'){
      toName.classList.add('deny');
      setTimeout(()=>toName.classList.remove('deny'),400);
      return;
    }
    messageTitle.textContent = 'To Mr. Limerick';
    messageCard.classList.add('show');
    messageCard.classList.remove('hidden');
    // big rain of hearts
    rainHearts();
  });

  // Specials flip-cards: toggle open on click and small heart burst
  const specialsRoot = document.getElementById('specials');
  if(specialsRoot){
    specialsRoot.addEventListener('click', (ev)=>{
      const card = ev.target.closest('.special');
      if(!card) return;
      card.classList.toggle('open');
      // small burst when opened
      if(card.classList.contains('open')){
        for(let i=0;i<8;i++) setTimeout(()=>makeHeart(card.getBoundingClientRect().left + (Math.random()*card.offsetWidth)), i*60);
      }
    });
  }

  // click anywhere to create a heart
  document.addEventListener('click', (e)=>{
    if(e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
    makeHeart(e.clientX);
  });

  // keep a few hearts (cleanup) - guard if user leaves page
  window.addEventListener('beforeunload', ()=>{ clearInterval(autoInterval); clearInterval(imgInterval); });
})();