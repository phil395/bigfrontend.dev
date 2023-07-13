type RequestMock = Record<string, unknown>

type NextFunc = (error?: unknown) => void

type MiddlewareFunc =
  (req: RequestMock, next: NextFunc) => void | Promise<void>

type ErrorHandler =
  (error: unknown, req: RequestMock, next: NextFunc) => void

type AnuFunc = (...args: any[]) => any

type RemoveLast<T extends any[]> =
  T extends [...infer Head, any] ? Head : any[];

const promisify = <T extends AnuFunc>(func: T) => {
  return (...args: RemoveLast<Parameters<T>>) => {
    return new Promise<undefined>((resolve, reject) => {
      func(...args, (error: unknown) => {
        if (error) reject(error)
        else resolve(undefined)
      })
    })
  }
}

class Middleware {
  private handlers: MiddlewareFunc[] = []
  private errorHandlers: ErrorHandler[] = []

  public use(func: MiddlewareFunc | ErrorHandler): void {
    switch (func.length) {
      case 2:
        this.handlers.push(func as MiddlewareFunc)
        break
      case 3:
        this.errorHandlers.push(func as ErrorHandler)
        break
      default:
        throw new Error(
          'Parameter count error! Pass 2 or 3 parameters to function'
        )
    }
  }

  private async iterateHandler(
    iterator: IterableIterator<MiddlewareFunc>,
    req: RequestMock
  ) {
    const next = iterator.next()
    if (next.done) return;
    const handler = promisify(next.value)
    await handler(req)
    await this.iterateHandler(iterator, req)
  }

  private async iterateErrorHandler(
    iterator: IterableIterator<ErrorHandler>,
    error: unknown,
    req: RequestMock
  ) {
    const next = iterator.next()
    if (next.done) throw error
    const errorHandler = promisify(next.value)
    try {
      await errorHandler(error, req)
    } catch (newError) {
      await this.iterateErrorHandler(iterator, newError, req)
    }
  }

  public async start(req: RequestMock) {
    const handlersIterator = this.handlers[Symbol.iterator]()
    try {
      await this.iterateHandler(handlersIterator, req)
    } catch (error) {
      const errorHandlersIterator = this.errorHandlers[Symbol.iterator]()
      await this.iterateErrorHandler(errorHandlersIterator, error, req)
    }
  }
}

