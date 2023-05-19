type AnyFunc = (...args: any[]) => any

const throttle = <T extends AnyFunc>(func: T, delay: number) => {
  let timerId: number | null = null
  let delayedArgs: Parameters<T> | null = null

  const handler = () => {
    timerId = null
    if (delayedArgs !== null) {
      func(delayedArgs)
      delayedArgs = null
      timerId = setTimeout(handler, delay)
    }
  }

  return (...args: Parameters<T>): void => {
    if (timerId !== null) {
      delayedArgs = args
      return;
    }
    func(args)
    timerId = setTimeout(handler, delay)
  }
}
