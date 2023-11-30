export const isArray = Array.isArray
export const isObject = (value) => {
  return value !== null && typeof value === 'object'
}
export const isFunction = (value) => {
  return typeof value === 'function'
}
export const hasChanged = (value: any, oldValue: any): boolean => !Object.is(value, oldValue)
export const extend = Object.assign
