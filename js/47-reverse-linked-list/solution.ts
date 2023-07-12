interface LinkedListNode {
  val: number,
  next: LinkedListNode | null
}

// const reverseLinkedList = (list: LinkedListNode) => {
//   let reversed: LinkedListNode = { val: list.val, next: null }
//   let next = list.next
//   while (next) {
//     reversed = {
//       val: next.val,
//       next: reversed
//     }
//     next = next.next
//   }
//   return reversed
// }


const reverseLinkedList = (list: LinkedListNode) => {
  const reverse = (
    current: LinkedListNode | null,
    prev: LinkedListNode | null
  ): LinkedListNode => {
    if (!current) {
      return prev as LinkedListNode
    }
    const next = current.next
    current.next = prev
    return reverse(next, current)
  }
  return reverse(list, null)
}
