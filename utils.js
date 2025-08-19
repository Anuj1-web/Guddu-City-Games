export function makeIntro(onStart){
  const intro = document.createElement('div');
  intro.style.position='fixed'; intro.style.inset='0'; intro.style.display='grid';
  intro.style.placeItems='center'; intro.style.background='linear-gradient(180deg,#0a0f14,#1a2a3a)';
  intro.style.zIndex='100';
  intro.innerHTML = '<div style="text-align:center"><h1>Guddu City</h1><p>Tap to start exploring</p><button id="startBtn">Start</button></div>';
  document.body.appendChild(intro);
  intro.querySelector('#startBtn').addEventListener('click', ()=>{ intro.remove(); onStart?.(); });
}
