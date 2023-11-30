type KeyToDepMap = Map<any, Set<ReactiveEffect>>
const targetMap = new WeakMap<object, KeyToDepMap>()

export let activeEffect: ReactiveEffect | undefined = undefined

export function track(target: object, key: string | symbol) {
  if (!activeEffect) return // 没有依赖收集的副作用,直接return
  console.log('track:', key)
  let propMap = targetMap.get(target)
  if (!propMap) {
    targetMap.set(target, (propMap = new Map()))
  }
  let deps = propMap.get(key)
  if (!deps) {
    propMap.set(key, (deps = new Set<ReactiveEffect>()))
  }
  deps.add(activeEffect)
}

export function trigger(target: object, key: string | symbol, value: unknown) {
  console.log('trigger:', key)
  let deps = targetMap.get(target)?.get(key)
  if (deps) {
    deps.forEach((effect) => effect.run())
  }
}

export function effect<T = any>(fn: () => T) {
  const _effect = createReactiveEffect(fn)
  _effect.run()
}

export function createReactiveEffect<T = any>(fn: () => T) {
  return new ReactiveEffect(fn)
}

export class ReactiveEffect<T = any> {
  constructor(private fn: () => T) {}

  run() {
    activeEffect = this
    // const res = this.fn()
    // activeEffect = undefined
    return this.fn()
  }
}
