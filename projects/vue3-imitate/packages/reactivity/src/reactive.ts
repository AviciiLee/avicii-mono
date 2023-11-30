import { mutableHandlers } from './baseHandlers'
import { isObject } from '@avicii/shared'
export const reactiveMap = new WeakMap<object, any>()

export function reactive(target: object) {
  return createReactiveObject(target, mutableHandlers, reactiveMap)
}

function createReactiveObject(
  target: object,
  mutableHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<object, any>
) {
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }
  const proxy = new Proxy(target, mutableHandlers)
  proxyMap.set(target, proxy)
  return proxy
}

export function toReactive<T extends unknown>(value: T) {
  return isObject(value) ? reactive(value as object) : value
}
