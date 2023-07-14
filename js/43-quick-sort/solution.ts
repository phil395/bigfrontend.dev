const swap = (arr: number[], i: number, j: number) => {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

const quickSort = (
  arr: number[],
  start: number = 0,
  end: number = arr.length - 1
) => {
  if (!arr.length) return;
  const pivot = arr[end]
  let i = start
  for (let j = start; j < end; j++) {
    if (arr[j] < pivot) {
      swap(arr, i, j)
      i++
    }
  }
  swap(arr, i, end)
  if (i - start > 1) quickSort(arr, start, i - 1)
  if (end - i > 1) quickSort(arr, i + 1, end)
}
