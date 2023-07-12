const mergeSort = (arr: number[]): void => {
  const merge = (origin: number[], a: number[], b: number[]) => {
    let i = 0, pa = 0, pb = 0
    while (pa < a.length && pb < b.length) {
      if (a[pa] <= b[pb]) {
        origin[i] = a[pa]
        pa++
      } else {
        origin[i] = b[pb]
        pb++
      }
      i++
    }
    const pushRest = (src: number[], start: number) => {
      for (let j = start; j < src.length; j++) {
        origin[i] = src[j]
        i++
      }
    }
    pushRest(a, pa)
    pushRest(b, pb)
  }
  const sort = (arr: number[]) => {
    if (arr.length <= 1) return
    const im = arr.length >> 1
    const a = arr.slice(0, im)
    const b = arr.slice(im)
    sort(a)
    sort(b)
    merge(arr, a, b)
  }
  sort(arr)
}

