import * as THREE from './libs/three.module.js';
export function createSky(scene, imgPath='./images/sky.jpg'){
  scene.background = new THREE.Color(0x87c7ff);
  scene.fog = new THREE.Fog(0x87c7ff, 200, 1800);
  const hemi = new THREE.HemisphereLight(0xffffff, 0x5f86a1, 0.9);
  hemi.position.set(0,200,0);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffffff, 1.0);
  sun.position.set(-100,200,-100);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048,2048);
  scene.add(sun);
  // Skydome (optional texture)
  const tex = new THREE.TextureLoader().load(imgPath);
  tex.anisotropy = 8;
  const geo = new THREE.SphereGeometry(2000, 48, 48);
  const mat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide });
  const dome = new THREE.Mesh(geo, mat);
  dome.name = 'SkyDome';
  scene.add(dome);
}
