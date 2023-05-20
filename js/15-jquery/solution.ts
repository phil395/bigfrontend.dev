type CSSProperties = Exclude<keyof CSSStyleDeclaration, "length" | "parentRule" | number | typeof Symbol.iterator>
type Methods = {
  css<T extends CSSProperties>(
    property: T,
    value: CSSStyleDeclaration[T]
  ): Methods
}

const provideMethods = (element: HTMLElement): Methods => {
  return {
    css(property, value) {
      element.style[property] = value
      return this
    }
  }
}


const $ = (selector: string) => {
  const element = document.querySelector(selector)
  if (element instanceof HTMLElement) {
    return provideMethods(element)
  }
}
