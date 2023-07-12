const allSettled = async <T>(promises: Promise<T>[]) => {
  const answer: PromiseSettledResult<T>[] = []
  for (let i = 0; i < promises.length; i++) {
    try {
      const value = await Promise.resolve(promises[i])
      answer[i] = { status: 'fulfilled', value }
    } catch (reason) {
      answer[i] = { status: 'rejected', reason }
    }
  }
  return answer
}

