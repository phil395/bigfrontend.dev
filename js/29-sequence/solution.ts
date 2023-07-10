type Callback = (error: Error | undefined | null, data: unknown) => void

type AsyncFunc = (
  callback: Callback,
  data: unknown
) => void

const sequence = (funcs: AsyncFunc[]) => {
  funcs.reverse()
  const next = (cb: Callback, data: unknown) => {
    const f = funcs.pop()
    if (!f) return cb(undefined, data)
    f((error, newData) => {
      if (error) return cb(error, undefined)
      next(cb, newData)
    }, data)
  }
  return next
}

