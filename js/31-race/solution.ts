type Callback = (error: Error | undefined | null, data: unknown) => void

type AsyncFunc = (
  callback: Callback,
  data?: unknown
) => void

const race = (funcs: AsyncFunc[]) => {
  return (cb: Callback, data?: unknown) => {
    let isDone = false
    for (const f of funcs) {
      f((error, newData) => {
        if (isDone) return;
        isDone = true
        if (error) return cb(error, undefined)
        cb(undefined, newData)
      }, data)
    }
  }
}
