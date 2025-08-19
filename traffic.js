
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js'
export function makeTraffic(entitiesRef){
  const g = new THREE.Group()
  const carTex = new THREE.TextureLoader().load('./car.png')
  const geo = new THREE.PlaneGeometry(3.6,1.8)
  for(let i=0;i<30;i++){
    const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({map:carTex, transparent:true}))
    m.position.set((Math.random()-0.5)*300, 0.9, (Math.random()-0.5)*300)
    m.userData = { angle: Math.random()*Math.PI*2, speed: 4+Math.random()*3, radius: 40+Math.random()*120 }
    g.add(m); entitiesRef.count++
  }
  g.userData.type='traffic'
  return g
}
export function updateTraffic(group, dt){
  for(const m of group.children){
    const u = m.userData
    u.angle += u.speed * dt / u.radius
    m.position.x = Math.cos(u.angle)*u.radius
    m.position.z = Math.sin(u.angle)*u.radius
    m.lookAt(0, m.position.y, 0)
  }
}
