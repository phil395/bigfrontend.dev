
const swap = (array: unknown[], i: number, j: number) => {
  const tmp = array[i]
  array[i] = array[j]
  array[j] = tmp
}

class PriorityQueue<T> {
  public heap = ['#'] as T[]

  constructor(
    private compare = (a: T, b: T) => (a < b ? -1 : 1) as number
  ) { }

  public add(element: T) {
    const heap = this.heap
    const f = (i: number) => {
      return this.compare(heap[i], heap[i >> 1]) < 0
    }
    heap.push(element)
    let i = heap.length - 1
    while (i > 0 && f(i)) {
      swap(heap, i, i >> 1)
      i >>= 1
    }
  }

  public poll(): T {
    const heap = this.heap
    const f = (i: number, j: number) => {
      return this.compare(heap[i], heap[j]) < 0
    }
    const x = heap[1]
    swap(heap, 1, heap.length - 1)
    heap.pop()
    let i = 1
    while (i * 2 < heap.length) {
      let idx = i * 2
      const right_idx = idx + 1
      if (right_idx < heap.length && f(right_idx, idx)) {
        idx = right_idx
      }
      if (f(i, idx)) {
        return x
      }
      swap(heap, i, idx)
      i = idx
    }
    return x
  }

  public peek(): T {
    return this.heap[1]
  }

  public size(): number {
    return this.heap.length - 1
  }
}
