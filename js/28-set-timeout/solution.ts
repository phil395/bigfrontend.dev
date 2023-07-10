interface Window {
  setTimeout: {
    timerIds?: Set<number>
  }
  clearAllTimeout: () => void
}

const originalSetTimeout = window.setTimeout
const originalClearTimeout = window.clearTimeout

window.setTimeout = (
  handler: TimerHandler,
  timeout?: number,
  ...args: any[]
): number => {
  const id = originalSetTimeout(handler, timeout, ...args)
  if (!window.setTimeout.timerIds) {
    window.setTimeout.timerIds = new Set()
  }
  window.setTimeout.timerIds.add(id)
  return id
}

window.clearTimeout = (id: number | undefined): void => {
  originalClearTimeout(id)
  if (window.setTimeout.timerIds && id) {
    window.setTimeout.timerIds.delete(id)
  }
}

window.clearAllTimeout = () => {
  const ids = window.setTimeout.timerIds
  if (ids) {
    ids.forEach(window.clearTimeout)
  }
}
