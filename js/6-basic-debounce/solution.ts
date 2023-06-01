type AnyFunc = (...args: any[]) => any

const debounce = <T extends AnyFunc>(func: T, wait: number) => {
  let timer: number
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), wait)
  }
}


