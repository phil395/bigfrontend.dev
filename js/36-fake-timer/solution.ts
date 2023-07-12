interface DelayedHandler {
  id: number,
  handler: (...args: any[]) => any,
  time: number,
  args: unknown[],
  valueOf: () => number
}

const swap = (arr: unknown[], i: number, j: number) => {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

class MinHeap<T> {
  private heap = ['#'] as T[]

  public add(node: T) {
    this.heap.push(node)
    let i = this.heap.length - 1
    while (i > 0 && this.heap[i >> 1] > this.heap[i]) {
      swap(this.heap, i, i >> 1)
      i >>= 1
    }
  }

  public pop(): T | undefined {
    const h = this.heap
    if (h.length < 2) {
      return
    }
    const x = this.heap[1]
    swap(h, 1, h.length - 1)
    h.pop()
    let i = 1
    while (i * 2 < h.length) {
      let min_i = i * 2
      let right_i = min_i + 1
      if (right_i < h.length && h[right_i] < h[min_i]) {
        min_i = right_i
      }
      if (h[i] < h[min_i]) {
        return x
      }
      swap(h, i, min_i)
      i = min_i
    }
    return x
  }

  public size() {
    return this.heap.length - 1
  }

  public getArray() {
    return this.heap
  }

  public clear() {
    this.heap = ["#"] as T[]
  }
}

class FakeTimer {
  private lastTimerId = 0
  private queue = new MinHeap<DelayedHandler>()
  private originalMethods = {
    setTimeout: globalThis.setTimeout,
    clearTimeout: globalThis.clearTimeout,
    dateNow: Date.now
  }
  private now = 0

  public install() {
    globalThis.setTimeout = (handler, delay = 0, ...args) => {
      const id = ++this.lastTimerId
      const time = this.now + delay
      this.queue.add({
        handler: handler as DelayedHandler['handler'],
        time,
        id,
        args,
        valueOf: () => time
      })
      return id
    }
    globalThis.clearTimeout = (id?: number) => {
      if (id) {
        for (const i of this.queue.getArray()) {
          if (i.id === id) {
            i.handler = () => { }
            i.args = []
          }
        }
      }
    }
    Date.now = () => this.now
  }

  public uninstall() {
    const { setTimeout, clearTimeout, dateNow } = this.originalMethods
    globalThis.setTimeout = setTimeout
    globalThis.clearTimeout = clearTimeout
    Date.now = dateNow
    this.now = 0
    this.queue.clear()
  }

  public tick() {
    while (this.queue.size()) {
      const { handler, time: delay, args } = this.queue.pop()!
      this.now = delay
      handler(...args)
    }
    this.now = 0
  }
}
