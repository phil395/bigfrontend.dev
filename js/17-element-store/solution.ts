type ElementWithStore = HTMLElement & { [storeKey: symbol]: unknown }

interface INodeStore {
  set(node: ElementWithStore, value: unknown): void
  get<T>(node: ElementWithStore): T | undefined
  has(node: ElementWithStore): boolean
}

class NodeStore implements INodeStore {
  private readonly storeKey: symbol = Symbol()

  set(node: ElementWithStore, value: unknown): void {
    node[this.storeKey] = value
  }

  get<T>(node: ElementWithStore) {
    return node[this.storeKey] as T | undefined
  }

  has(node: ElementWithStore): boolean {
    if (this.storeKey in node) return true
    return false
  }
}
