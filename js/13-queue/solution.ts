declare class Stack<T> {
  push(element: T): void
  peek(): T
  pop(): T
  size(): number
}

interface IQueue<T> {
  enqueue(element: T): void
  peek(): T
  dequeue(): T | undefined
  size(): number
}


class Queue<T> implements IQueue<T> {
  private input = new Stack<T>()
  private output = new Stack<T>()

  public enqueue(element: T): void {
    this.input.push(element)
  }

  public peek(): T {
    return this.get("peek")
  }

  public dequeue(): T | undefined {
    return this.get("pop")
  }

  public size(): number {
    return this.output.size() + this.input.size()
  }

  private get(type: Extract<keyof Stack<T>, "peek" | "pop">) {
    if (this.output.size()) {
      return this.output[type]()
    }
    this.fillOutput()
    return this.output[type]()
  }

  private fillOutput() {
    while (this.input.size()) {
      this.output.push(
        this.input.pop()
      )
    }
  }
}
