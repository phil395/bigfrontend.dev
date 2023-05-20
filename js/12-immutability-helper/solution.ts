// Types

interface BaseCommands<T> {
  $set?: T
  $apply?: (item: T) => T
}

interface ArrayCommands {
  $push?: unknown[]
}

interface ObjectCommands extends BaseCommands<unknown> {
  $merge?: UnknownObject
}

type ObjectAction<T extends object> = ObjectCommands & {
  [Prop in keyof T]?: Action<T[Prop]>
}

type ArrayAction<T extends unknown[]> = ArrayCommands & {
  [key: number]: Action<T[typeof key]>
}

type Action<T> = T extends unknown[]
  ? ArrayAction<T>
  : T extends UnknownObject
  ? ObjectAction<T>
  : BaseCommands<T>


type UnknownObject = Record<string | number, unknown>
type ArrayOrObject = unknown[] | UnknownObject

// Type guards

const isObject = (
  target: unknown
): target is UnknownObject => {
  if (
    typeof target === 'object' &&
    Array.isArray(target) === false &&
    target !== null
  ) {
    return true
  }
  return false
}

const isArrayOrObject = (
  target: unknown
): target is UnknownObject => {
  if (typeof target === "object" && target !== null) {
    return true
  }
  return false
}

// Main

const COMMANDS = ["$set", "$apply", "$push", "$merge"] as const

const handleCommand = (
  command: typeof COMMANDS[number],
  source: unknown,
  action: UnknownObject
) => {
  switch (command) {
    case "$set":
      return action[command]
    case "$merge":
      const merging = action[command]
      if (isObject(source) && isObject(merging)) {
        return {
          ...source,
          ...merging
        }
      }
      return;
    case "$apply":
      const func = action[command]
      if (typeof func === 'function') {
        return func(source)
      }
      return;
    case "$push":
      if (Array.isArray(source)) {
        let elements = action[command]
        elements = Array.isArray(elements)
          ? elements
          : [elements]
        return [...source, ...elements as unknown[]]
      }
      return;
    default:
      return;
  }
}

const throwError = (msg = "Command passed incorrectly") => {
  throw new Error(msg)
}

const fillClone = (source: unknown, action: unknown) => {
  if (!isObject(action)) {
    return throwError()
  }
  const command = COMMANDS.find(c => c in action)
  if (command) {
    const result = handleCommand(command, source, action)
    if (result) return result
    return throwError()
  }
  if (!isArrayOrObject(source)) {
    return throwError()
  }
  let clone: Record<string, any>
  if (Array.isArray(source)) clone = [...source]
  else clone = { ...source }
  for (const key in action) {
    clone[key] = fillClone(source[key], action[key])
  }
  return clone
}

const update = <T extends ArrayOrObject>(
	data: T, action: Action<T>
): T => {
  return fillClone(data, action)
}

