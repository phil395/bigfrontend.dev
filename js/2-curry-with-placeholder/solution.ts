type UnknownFunc = (...args: unknown[]) => unknown
type Curry = {
  (fn: UnknownFunc): UnknownFunc;
  placeholder: Symbol
}

const curry: Curry = (fn) => {
  const curried = (...args: unknown[]) => {
    while (args.length > fn.length) args.pop()
    const emptyIndexes = args.reduce<number[]>((acc, arg, i) => {
      if (arg === curry.placeholder) acc.push(i)
      return acc
    }, []).reverse()

    if (args.length - emptyIndexes.length === fn.length) {
      return fn(...args)
    }

    return (...nextArgs: unknown[]) => {
      const rest: unknown[] = []
      for (const arg of nextArgs) {
        const i = emptyIndexes.pop()
        if (typeof i !== 'undefined') args[i] = arg
        else rest.push(arg)
      }
      return curried(...args, ...rest)
    }
  }

  return curried
}

curry.placeholder = Symbol()

