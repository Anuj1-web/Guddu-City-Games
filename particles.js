import * as THREE from './libs/three.module.js';
export function createParticles(scene){
  const count = 800;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count*3);
  for(let i=0;i<count;i++){
    pos[i*3+0] = (Math.random()-0.5)*600;
    pos[i*3+1] = Math.random()*200 + 10;
    pos[i*3+2] = (Math.random()-0.5)*600;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
  const mat = new THREE.PointsMaterial({ size: 1.8, transparent:true, opacity:0.85 });
  const points = new THREE.Points(geo, mat);
  points.name = 'MagicalParticles';
  scene.add(points);
  return points;
}
