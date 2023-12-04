export * from './shapeFlags'
export const isArray = Array.isArray
export const isObject = (value) => {
  return value !== null && typeof value === 'object'
}
export const isFunction = (value) => {
  return typeof value === 'function'
}
export const hasChanged = (value: any, oldValue: any): boolean => !Object.is(value, oldValue)
export const extend = Object.assign
export const EMPTY_OBJ: { readonly [key: string]: any } = {}
export const isString = (value) => typeof value === 'string'
const onRe = /^on[^a-z]/
export const isOn = (key: string) => onRe.test(key)
