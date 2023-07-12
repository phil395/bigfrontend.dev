type AnyFunc = (...args: any[]) => any

const once = <T extends AnyFunc>(func: T): T => {
  let result: ReturnType<T>
  let isCalled = false
  return function (this: object, ...args) {
    if (isCalled) return result
    isCalled = true
    result = func.apply(this, args)
    return result
  } as T
}
