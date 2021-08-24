const getStyle = (element: HTMLElement, prop: string): number => {
  return parseInt(window.getComputedStyle(element).getPropertyValue(prop));
}

const getPseudoStyle = (element: HTMLElement, prop: string): number => {
  return parseInt(window.getComputedStyle(element, ':before').getPropertyValue(prop));
}

export {
  getStyle,
  getPseudoStyle
} 