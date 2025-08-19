
export function raycastInteract(renderer, camera, scene){
  const raycaster = new (THREE.Raycaster)()
  const mouse = new (THREE.Vector2)()
  function onTap(e){
    const rect = renderer.domElement.getBoundingClientRect()
    const x = ( (e.clientX??(e.changedTouches?.[0].clientX||0)) - rect.left ) / rect.width * 2 - 1
    const y = -(((e.clientY??(e.changedTouches?.[0].clientY||0)) - rect.top ) / rect.height * 2 - 1)
    mouse.set(x,y)
    raycaster.setFromCamera(mouse, camera)
    const hits = raycaster.intersectObjects(scene.children, true)
    const item = hits.find(h=>h.object.userData && (h.object.userData.type==='gift' || h.object.userData.type==='candy'))
    if(item){
      const o = item.object
      o.scale.multiplyScalar(1.2)
      setTimeout(()=>o.scale.multiplyScalar(1/1.2), 200)
      alert(`You found a ${o.userData.type}!`)
    }
  }
  renderer.domElement.addEventListener('click', onTap)
  renderer.domElement.addEventListener('touchend', onTap)
}
