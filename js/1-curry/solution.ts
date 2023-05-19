type UnknownFunc = (...args: unknown[]) => unknown
type Curry = (fn: UnknownFunc) => UnknownFunc

const curry: Curry = (fn) => {
  const f = (...args: unknown[]) => {
    if (args.length >= fn.length) {
      return fn(...args)
    }
    return (...nextArgs: unknown[]) => f(...args, ...nextArgs)
  }
  return f
}
