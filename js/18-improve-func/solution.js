// Given an input of array, 
// which is made of items with >= 3 properties

let items = [
  { color: 'red', type: 'tv', age: 18 },
  { color: 'silver', type: 'phone', age: 20 },
  { color: 'blue', type: 'book', age: 17 }
]

// an exclude array made of key value pair
const excludes = [
  { k: 'color', v: 'silver' },
  { k: 'type', v: 'tv' },
]

function excludeItems(items, excludes) {
  const map = excludes.reduce((acc, { k, v }) => {
    if (k in acc) acc[k].add(v)
    else acc[k] = new Set([v])
    return acc
  }, {})
  return items.filter(item => {
    for (const key of Object.keys(item)) {
      const value = item[key]
      if (key in map && map[key].has(value)) {
        return false
      }
    }
    return true
  })
}
