const all = <T>(promises: T[]) => {
  return new Promise<Awaited<T>[]>((resolve, reject) => {
    if (!promises.length) resolve([])
    let counter = 0
    const answer: Awaited<T>[] = []
    for (let i = 0; i < promises.length; i++) {
      const item = promises[i]
      if (item instanceof Promise) {
        counter++
        item
          .then(result => {
            counter--
            answer[i] = result
            if (!counter) resolve(answer)
          })
          .catch(reject)
      } else {
        answer[i] = item as Awaited<T>
      }
    }
  })
}

