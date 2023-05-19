const flat = (array: unknown[], depth: number = 1) => {
  let result: unknown[] = [...array]
  let done = false
  while (depth > 0 && !done) {
    depth--
    done = true
    const tmp: unknown[] = []
    for (let item of result) {
      if (Array.isArray(item)) {
        tmp.push(...item)
        done = false
      } else {
        tmp.push(item)
      }
    }
    result = tmp
  }
  return result
}
