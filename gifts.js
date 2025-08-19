import * as THREE from './libs/three.module.js';
const giftMessages = [
  "You found a Golden Guddu!",
  "Candy Rush unlocked!",
  "City Explorer badge earned.",
  "Sparkle Boost activated.",
  "Secret Alley discovered.",
  "Mega Gift — 500 coins!",
  "Rainbow Trail enabled.",
  "Lucky spin available!",
  "Daily streak +1 — nice!",
  "Mystery Box opened."
];
const candyMessages = [
  "Yum! +10 energy.",
  "Sugar sparkles +1.",
  "Sweet speed boost!",
  "Candy combo x2.",
  "Delicious — keep going!"
];

export function createCollectibles(scene, paths={gift:'./images/gift.png', candy:'./images/candy.png'}){
  const group = new THREE.Group(); group.name='Collectibles';
  const texGift = new THREE.TextureLoader().load(paths.gift); texGift.anisotropy = 8;
  const texCandy = new THREE.TextureLoader().load(paths.candy); texCandy.anisotropy = 8;
  const matGift = new THREE.MeshStandardMaterial({ map: texGift, transparent:true });
  const matCandy = new THREE.MeshStandardMaterial({ map: texCandy, transparent:true });
  const geo = new THREE.PlaneGeometry(10,10);
  const spots = [
    [-120,5,-100],[-80,5,120],[60,5,-140],[130,5,60],[-140,5,40],[100,5,140],[0,5,0],[40,5,-40],[-60,5,80]
  ];
  spots.forEach((p, i)=>{
    const isGift = i%2===0;
    const m = new THREE.Mesh(geo, isGift?matGift:matCandy);
    m.position.set(p[0], p[1], p[2]);
    m.rotation.y = Math.random()*Math.PI*2;
    m.userData = { type: isGift ? 'gift' : 'candy', message: (isGift?giftMessages:(candyMessages))[Math.floor(Math.random()*(isGift?giftMessages.length:candyMessages.length))] };
    m.castShadow = true; m.receiveShadow = true;
    group.add(m);
  });
  scene.add(group);
  return group;
}

export function setupCollectibleInteractions(renderer, camera, scene){
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip'; tooltip.style.display='none'; document.body.appendChild(tooltip);
  function setMouse(clientX, clientY){
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  }
  function hit(){
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(scene.children, true);
    return hits.find(h=>h.object.userData && (h.object.userData.type==='gift' || h.object.userData.type==='candy'));
  }
  function show(msg){ tooltip.textContent = msg; tooltip.style.display='block'; setTimeout(()=>tooltip.style.display='none', 1500); }
  renderer.domElement.addEventListener('click', (e)=>{ setMouse(e.clientX, e.clientY); const h = hit(); if(h){ show(h.object.userData.message); } });
  renderer.domElement.addEventListener('touchend', (e)=>{ const t = e.changedTouches?.[0]; if(!t) return; setMouse(t.clientX, t.clientY); const h = hit(); if(h){ show(h.object.userData.message); } }, {passive:true});
}
