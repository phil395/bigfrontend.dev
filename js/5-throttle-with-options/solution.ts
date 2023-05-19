type AnyFunc = (...args: any[]) => any
interface ThrottleOptions {
  leading: boolean
  trailing: boolean
}

const defaultOption: ThrottleOptions = {
  leading: true,
  trailing: true
}

const throttle = <T extends AnyFunc>(
  func: T,
  delay: number,
  options: ThrottleOptions = defaultOption
) => {
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
      if (options.trailing) delayedArgs = args
      return;
    }

    if (options.leading) {
      func(args)
      timerId = setTimeout(handler, delay)
      return;
    }

    if (options.trailing) {
      delayedArgs = args
      timerId = setTimeout(handler, delay)
    }
  }
}
