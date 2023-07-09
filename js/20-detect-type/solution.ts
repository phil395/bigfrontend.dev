const detectType = (x: any): string => {
  if (x === undefined) return 'undefined'
  if (x === null) return 'null'
  return x.__proto__.constructor.name.toLowerCase()
}
