import * as THREE from './libs/three.module.js';
export function createHoardings(scene, img='./images/hoarding.png'){
  const group = new THREE.Group(); group.name = 'Hoardings';
  const tex = new THREE.TextureLoader().load(img); tex.anisotropy = 8;
  const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9, metalness: 0.0, transparent: true });
  const geo = new THREE.PlaneGeometry(60, 40);
  const positions = [[-150,0,-150],[150,0,-150],[-150,0,150],[150,0,150],[0,0,-200],[0,0,200]];
  for(const [x,_,z] of positions){
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x,20,z);
    m.castShadow = true; m.receiveShadow = true;
    group.add(m);
  }
  scene.add(group);
  return group;
}
export function spinHoardings(group, dt){
  if(!group) return;
  for(const m of group.children){ m.rotation.y += dt*0.2; }
}
