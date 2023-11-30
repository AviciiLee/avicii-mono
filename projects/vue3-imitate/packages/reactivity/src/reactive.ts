import { mutableHandlers } from './baseHandlers'
import { isObject } from '@avicii/shared'
export const reactiveMap = new WeakMap<object, any>()
export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive'
}
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
  proxy[ReactiveFlags.IS_REACTIVE] = true
  proxyMap.set(target, proxy)
  return proxy
}

export function toReactive<T extends unknown>(value: T) {
  return isObject(value) ? reactive(value as object) : value
}

export function isReactive(value): boolean {
  return !!(value && value[ReactiveFlags.IS_REACTIVE])
}
