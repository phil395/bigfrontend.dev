const swap = (arr: ["#", ...number[]], i: number, j: number) => {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

class MinHeap {
  private heap: ["#", ...number[]] = ["#"]
  public add(value: number) {
    const h = this.heap
    h.push(value)
    let i = h.length - 1
    while (i > 1 && h[i] < h[i >> 1]) {
      swap(h, i, i >> 1)
      i >>= 1
    }
  }
  public pop() {
    const h = this.heap
    const x = h[1]
    swap(h, 1, h.length - 1)
    h.pop()
    let i = 1
    while (i * 2 < h.length) {
      let min_idx = i * 2
      const right_idx = min_idx + 1
      if (right_idx < h.length && h[right_idx] < h[min_idx]) {
        min_idx = right_idx
      }
      if (h[i] < h[min_idx]) {
        return x
      }
      swap(h, i, min_idx)
      i = min_idx
    }
    return x
  }
  public size() {
    return this.heap.length - 1
  }
}

const findKThLargest = (arr: number[], k: number) => {
  const heap = new MinHeap()
  for (const i of arr) {
    heap.add(i)
    if (heap.size() > k) {
      heap.pop()
    }
  }
  return heap.pop()
}

