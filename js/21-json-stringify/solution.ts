
const stringify = (data: unknown): string | undefined | null => {
  switch (typeof data) {
    case "undefined":
    case "symbol":
    case "function":
      return;
    case "bigint":
      throw new TypeError("Do not know how to serialize a BigInt")
    case "boolean":
      return data.toString()
    case "number":
      return isNaN(data) || !isFinite(data) ? null : data.toString()
    case "string":
      return `"${data}"`
    case "object":
      if (data === null) return null
      if (Array.isArray(data)) {
        const parts: (string | null)[] = []
        for (const item of data) {
          parts.push(stringify(item) ?? "null")
        }
        return `[${parts.join(",")}]`
      }
      if (data instanceof Date) {
        return `"${data.toISOString()}"`
      }
      const parts: string[] = []
      for (const key in data) {
        if (Object.hasOwn(data, key)) {
          const value = stringify(data[key as keyof typeof data])
          if (typeof value !== "undefined") {
            parts.push(`"${key}":${value}`)
          }
        }
      }
      return `{${parts.join(",")}}`
    default:
      throw new Error()
  }
}
