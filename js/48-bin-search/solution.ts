const firstIndex = (arr: number[], target: number) => {
  let l = -1, r = arr.length
  while (r - l > 1) {
    const m = (r + l) >> 1
    if (arr[m] >= target) r = m
    else l = m
  }
  return arr[r] === target ? r : -1
}
