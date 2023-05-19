const decode = (message: string[][]) => {
  const result: string[] = [],
    n = message.length,
    m = n && message[0].length
  let i = 0,
    j = 0
  while (i < n && j < m) {
    result.push(message[i][j])
    if (i + 1 < n) {
      i++
      j++
    } else {
      i--
      j++
    }
  }
  return result.join('')
}
