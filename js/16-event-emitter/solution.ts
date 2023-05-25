interface ISubscription {
  release: () => void
}

type Listener = (...args: unknown[]) => void

interface IEventEmitter {
  subscribe(event: string, listener: Listener): ISubscription
  emit(...args: unknown[]): void
}

class EventEmitter implements IEventEmitter {
  private listeners = new Map()
  public subscribe(event: string, listener: Listener) {
    const ls = this.listeners
    const id = Symbol()
    if (!ls.has(event)) {
      ls.set(event, new Map())
    }
    ls.get(event).set(id, listener)
    return {
      release: () => {
        this.release(event, id)
      }
    }
  }
  public emit(event: string, ...args: unknown[]) {
    const ls = this.listeners
    if (!ls.has(event)) return;
    for (const [_, listener] of ls.get(event)) {
      listener(...args)
    }
  }
  private release(event: string, listenerId: symbol) {
    const ls = this.listeners
    const listeners = ls.get(event)
    listeners.delete(listenerId)
    if (!listeners.size) {
      ls.delete(event)
    }
  }
}


