import { isArray, isObject, isString } from 'packages/shared/src'

export function normalizeClass(value: unknown): string {
  let res = ''
  if (isString(value)) {
    return value as string
  } else if (isArray(value)) {
    for (const klass of value) {
      const normalized = normalizeClass(klass)
      if (normalized) {
        res += normalized + ' '
      }
    }
  } else if (isObject(value)) {
    for (const key in value as object) {
      if ((value as object)[key]) {
        res += key + ' '
      }
    }
  }
  return res.trim()
}
