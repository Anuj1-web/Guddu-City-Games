import * as THREE from './libs/three.module.js';
export function createTrees(scene, treeTexPath='./images/tree.png'){
  const tex = new THREE.TextureLoader().load(treeTexPath); tex.anisotropy = 8;
  const mat = new THREE.MeshStandardMaterial({ map: tex, transparent:true });
  const geo = new THREE.PlaneGeometry(16, 24);
  const group = new THREE.Group(); group.name='Trees';
  for(let i=0;i<40;i++){
    const m = new THREE.Mesh(geo, mat);
    const r = 180 + Math.random()*140, a = Math.random()*Math.PI*2;
    m.position.set(Math.cos(a)*r, 12, Math.sin(a)*r);
    m.rotation.y = Math.random()*Math.PI*2;
    m.castShadow = true; m.receiveShadow = true;
    group.add(m);
  }
  scene.add(group);
  return group;
}
