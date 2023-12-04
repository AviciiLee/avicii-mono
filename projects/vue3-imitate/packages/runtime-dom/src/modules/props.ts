export const patchDomProp = (el: Element, key: string, value: any) => {
  try {
    el[key] = value == null ? '' : value
  } catch (error) {
    console.error(error)
  }
}
