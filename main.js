import * as THREE from 'three';
import { OrbitControls } from './controls.js';
import { createSky } from './sky.js';
import { createHoardings } from './hoardings.js';
import { createGifts } from './gifts.js';
import { createParticles } from './particles.js';
import { createTraffic } from './traffic.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa0d8f0);

// Camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(0, 100, 200);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxPolarAngle = Math.PI / 2.1;

// Lights
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
hemiLight.position.set(0, 200, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(-100, 200, -100);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 4096;
dirLight.shadow.mapSize.height = 4096;
scene.add(dirLight);

// ==================
// Load Ground Tiles
// ==================
const loader = new THREE.TextureLoader();
const groundGroup = new THREE.Group();
scene.add(groundGroup);

const tileSize = 500; // each tile size
const gridSize = 3;   // 3x3 tiles

for (let i = 1; i <= gridSize; i++) {
  for (let j = 1; j <= gridSize; j++) {
    const texture = loader.load(`./images/ground_${i}_${j}.jpg`);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const material = new THREE.MeshStandardMaterial({ map: texture });
    const geometry = new THREE.PlaneGeometry(tileSize, tileSize);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;

    // Positioning tiles
    mesh.position.x = (j - 2) * tileSize;
    mesh.position.z = (i - 2) * tileSize;

    mesh.receiveShadow = true;
    groundGroup.add(mesh);
  }
}

// ==================
// Environment Objects
// ==================
createSky(scene, './images/sky.jpg');
createHoardings(scene);
createGifts(scene);
createParticles(scene);
createTraffic(scene);

// Responsive resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
