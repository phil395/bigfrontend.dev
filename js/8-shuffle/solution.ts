const shuffle = <T>(array: T[]) => {
  const randInt = (max: number) => (Math.random() * (max + 1)) ^ 0
  const swap = (i: number, j: number) => {
    const tmp = array[i]
    array[i] = array[j]
    array[j] = tmp
  }
  let i = array.length
  while (i--) {
    const j = randInt(i)
    swap(i, j)
  }
  return array
}
