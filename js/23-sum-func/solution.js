const sum = (a) => {
  const f = (b) => sum(a + b)
  f[Symbol.toPrimitive] = () => a
  return f
}
