const any = async <T>(promises: Promise<T>[]) => {
  const errors: unknown[] = []
  let cnt = 0
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      if (!(promises[i] instanceof Promise)) {
        resolve(promises[i])
      }
      promises[i]
        .then(resolve)
        .catch((reason) => {
          errors[i] = reason
          cnt++
          if (cnt === promises.length) {
            reject(new AggregateError("All promises were rejected", errors))
          }
        })
    }
  })
}
