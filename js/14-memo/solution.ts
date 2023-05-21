type AnyFunc = (...args: any[]) => any

const isObject = (a: unknown) => typeof a === 'object'

const defaultKeyResolver = <T extends unknown[]>(...args: T) => {
  if (args.length <= 1) {
    return args[0]
  }
  if (args.some(isObject)) {
    throw new Error(`If you pass two or more objects as arguments,
    you must define resolver`)
  }
  return args.join("_")
}

const memo = <T extends AnyFunc>(
  func: T,
  keyResolver = defaultKeyResolver<Parameters<T>>
) => {
  const cache = new Map<unknown, ReturnType<T>>()
  return function (
    this: unknown,
    ...args: Parameters<T>
  ): ReturnType<T> {
    const key = keyResolver(...args)
    const cached = cache.get(key)
    if (cached) return cached
    const result = func.apply(this, args)
    cache.set(key, result)
    return result
  }
}
