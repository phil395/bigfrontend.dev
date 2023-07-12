type MethodsOnly<T> = Pick<T, {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T]>;

const spyOn = <T>(
  target: T,
  method: keyof MethodsOnly<T>
) => {
  type OriginalMethod = T[typeof method]
  type Handler = OriginalMethod & { calls: unknown[] }
  const calls: unknown[] = []
  const originalMethod = (target[method] as Function).bind(target);
  const handler = (...args: unknown[]) => {
    calls.push(args)
    originalMethod(...args)
  }
  handler.calls = calls
  target[method] = handler as OriginalMethod
  return handler as Handler
}
