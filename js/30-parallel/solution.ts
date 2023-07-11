type Callback = (error: Error | undefined | null, data: unknown) => void

type AsyncFunc = (
  callback: Callback
) => void

const promisify = (func: AsyncFunc) => {
  return new Promise((res, rej) => {
    func((error, data) => {
      if (error) rej(error)
      res(data)
    })
  })
}

const parallel = (funcs: AsyncFunc[]) => {
  return (cb: Callback) => {
    Promise.all(funcs.map(promisify))
      .then(result => {
        cb(undefined, result)
      })
      .catch(reason => {
        cb(reason, undefined)
      })
  }
}
