let handleError: null | Function = null

export const isArray = Array.isArray

export const registerErrorHandler = (fn) => {
  handleError = fn
}

export function foo(fn) {
  return callWithErrorHandling(fn)
}

function callWithErrorHandling(fn) {
  try {
    return fn()
  } catch (err) {
    handleError && handleError(err)
  }
}
