const flat = (array: unknown[], depth: number = 1) => {
  if (depth <= 0) {
    return array
  }
  const result: unknown[] = []
  for (const el of array) {
    if (Array.isArray(el)) {
      result.push(
        ...flat(el, depth - 1)
      )
    } else {
      result.push(el)
    }
  }
  return result
}
