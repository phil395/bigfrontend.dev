const completeAssign = (target: object, ...sources: object[]) => {
  if (!target) throw new Error()
  target = new Object(target)
  for (const src of sources) {
    if (!src) continue
    Object.defineProperties(target, Object.getOwnPropertyDescriptors(src))
  }
  return target
}
