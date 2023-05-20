type Func<T> = (arg: T) => T

const pipe = <T>(funcs: Func<T>[]): Func<T> => {
  return (arg) => {
    return funcs.reduce<T>((acc, fn) => fn(acc), arg)
  }
}
