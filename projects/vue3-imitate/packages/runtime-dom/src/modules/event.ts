export function patchEvent(el: Element & { _vei?: object }, rawName: string, preVal, nextVal) {
  const invokers = el._vei || (el._vei = {})
  const existingInvoker = invokers[rawName]
  if (nextVal && existingInvoker) {
    existingInvoker.value = nextVal
  } else {
    const name = parseName(rawName)
    if (nextVal) {
      const invoker = (invokers[rawName] = createInvoker(nextVal))
      el.addEventListener(name, invoker)
    } else if (existingInvoker) {
      el.removeEventListener(name, existingInvoker)
      invokers[rawName] = undefined
    }
  }
}

function parseName(rawName: string) {
  return rawName.slice(2).toLowerCase()
}
function createInvoker(initValue): any {
  const invoker = (e: Event) => {
    invoker.value && invoker.value()
  }
  invoker.value = initValue
  return invoker
}
