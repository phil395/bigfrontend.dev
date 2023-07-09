const findCorrespondingNode = (
  rootA: Element,
  rootB: Element,
  target: Element
): any => {
  if (rootA === target) return rootB
  for (let i = 0; i < rootA.children.length; i++) {
    const node = findCorrespondingNode(
      rootA.children[i],
      rootB.children[i],
      target
    )
    if (node) return node
  }
}