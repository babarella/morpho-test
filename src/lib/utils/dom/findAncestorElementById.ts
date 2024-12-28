export function findAncestorElementById(element: HTMLElement, id: string): Element | null {
  if (element?.id === id) return element

  let parentResult = element?.parentElement

  while (parentResult?.id !== id) {
    if (parentResult?.tagName === 'BODY' || !parentResult) return null
    parentResult = parentResult.parentElement
  }

  return parentResult
}
