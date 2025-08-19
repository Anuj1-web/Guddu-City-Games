import * as THREE from './libs/three.module.js';
import { attachTouchControls } from './controls.js';
import { createSky } from './sky.js';
import { createHoardings } from './hoardings.js';
import { createCollectibles, setupCollectibleInteractions } from './gifts.js';
import { createParticles } from './particles.js';
import { createTraffic, updateTraffic } from './traffic.js';
import { createTrees } from './city.js';
import { makeIntro } from './utils.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.set(0, 120, 260);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Sky & lights
createSky(scene, './images/sky.jpg');

// Ground from 3x3 tiles
const loader = new THREE.TextureLoader();
const groundGroup = new THREE.Group(); groundGroup.name='Ground';
scene.add(groundGroup);
const tileSize = 500; const gridSize = 3;
for (let i = 1; i <= gridSize; i++) {
  for (let j = 1; j <= gridSize; j++) {
    const tex = loader.load(`./images/ground_${i}_${j}.jpg`);
    tex.wrapS = THREE.ClampToEdgeWrapping; tex.wrapT = THREE.ClampToEdgeWrapping; tex.anisotropy = 8;
    const mat = new THREE.MeshStandardMaterial({ map: tex });
    const geo = new THREE.PlaneGeometry(tileSize, tileSize);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI/2;
    mesh.position.x = (j - 2) * tileSize;
    mesh.position.z = (i - 2) * tileSize;
    mesh.receiveShadow = true;
    groundGroup.add(mesh);
  }
}

// Environment
const trees = createTrees(scene, './images/tree.png');
const hoards = createHoardings(scene, './images/hoarding.png');
const particles = createParticles(scene);
const collectibles = createCollectibles(scene, { gift:'./images/gift.png', candy:'./images/candy.png' });
const traffic = createTraffic(scene, './images/car.png');

// Interactions
setupCollectibleInteractions(renderer, camera, scene);

// Controls (mobile-friendly)
attachTouchControls(renderer.domElement, camera);

// UI
const ui = document.getElementById('ui');
ui.innerHTML = '<b>Guddu City</b> • Drag: look • Pinch: zoom • Tap: collect';
const badge = document.createElement('div'); badge.className='badge'; badge.textContent='HD Visuals • Mobile Friendly'; document.body.appendChild(badge);

// Resize
window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
let last = performance.now();
function animate(now){
  const dt = Math.min(0.05, (now - last)/1000); last = now;
  updateTraffic(traffic, dt);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

// Intro overlay then start
makeIntro(()=> requestAnimationFrame(animate));
