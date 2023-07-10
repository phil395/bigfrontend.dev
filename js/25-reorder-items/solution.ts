const swap = (array: unknown[], i: number, j: number) => {
  const tmp = array[i]
  array[i] = array[j]
  array[j] = tmp
}

const sort = (items: unknown[], newOrder: number[]) => {
  for (let i = 0; i < newOrder.length; i++) {
    while (newOrder[i] !== i) {
      const j = newOrder[i]
      swap(items, i, j)
      swap(newOrder, i, j)
    }
  }
  return items
}
