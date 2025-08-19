import * as THREE from './libs/three.module.js';
export function createTraffic(scene, carTexPath='./images/car.png'){
  const carTex = new THREE.TextureLoader().load(carTexPath); carTex.anisotropy = 8;
  const carMat = new THREE.MeshStandardMaterial({ map: carTex, transparent:true });
  const carGeo = new THREE.PlaneGeometry(14, 8);
  const group = new THREE.Group(); group.name = 'Traffic';
  const lanes = [80, 120, 160];
  for(let i=0; i<12; i++){
    const m = new THREE.Mesh(carGeo, carMat);
    m.position.set((Math.random()-0.5)*300, 4, (Math.random()-0.5)*300);
    m.userData = { angle: Math.random()*Math.PI*2, radius: lanes[i%lanes.length], speed: 0.6 + Math.random()*0.8 };
    m.castShadow = true; group.add(m);
  }
  scene.add(group);
  return group;
}
export function updateTraffic(group, dt){
  if(!group) return;
  for(const m of group.children){
    const u = m.userData;
    u.angle += u.speed * dt / u.radius;
    m.position.x = Math.cos(u.angle) * u.radius;
    m.position.z = Math.sin(u.angle) * u.radius;
    m.lookAt(0, m.position.y, 0);
  }
}
