
const makeDescriptors = (value: unknown) => ({
  configurable: true,
  enumerable: true,
  writable: true,
  value
})

const copyEntries = (
  type: "symbols" | "properties",
  target: object,
  source: object
) => {
  const f = Object[type === 'symbols' ? "getOwnPropertySymbols" : "keys"]
  const keys = f(source) as (keyof typeof source)[]
  for (const key of keys) {
    const value = source[key]
    Object.defineProperty(target, key, makeDescriptors(value))
  }
}

const objectAssign = <T extends {}>(target: object, ...sources: object[]): T => {
  if (!target) {
    throw new Error()
  }
  target = new Object(target)
  for (const source of sources) {
    if (!source) continue;
    for (const type of ["symbols", "properties"] as const) {
      copyEntries(type, target, source)
    }
  }
  return target as T
}

