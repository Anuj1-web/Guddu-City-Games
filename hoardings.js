
export function spinHoardings(group, dt){
  for(const m of group.children){
    if(m.material && m.material.map) m.rotation.y += dt*0.2
  }
}
