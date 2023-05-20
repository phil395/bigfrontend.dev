type IsBad = (version: number) => boolean

function firstBadVersion(isBad: IsBad) {
  return (version: number): number => {
    let l = -1, r = version + 1
    while (r - l > 1) {
      const m = (r + l) >>> 1
      if (isBad(m)) r = m
      else l = m
    }
    return isBad(r) ? r : -1
  }
}
