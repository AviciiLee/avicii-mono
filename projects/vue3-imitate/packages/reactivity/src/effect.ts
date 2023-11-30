import { extend, isArray } from '@avicii/shared'
import { createDep, type Dep } from './dep'
import { ComputedRefImpl } from './computed'

export type EffectScheduler = (...any: any[]) => any
type KeyToDepMap = Map<any, Dep>
const targetMap = new WeakMap<object, KeyToDepMap>()

export interface ReactiveEffectOptions {
  lazy?: boolean
  scheduler?: EffectScheduler
}

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
    propMap.set(key, (deps = createDep()))
  }
  trackEffects(deps)
}

export function trackEffects(dep: Dep) {
  dep.add(activeEffect!)
}

export function trigger(target: object, key: string | symbol, value: unknown) {
  console.log('trigger:', key)
  let dep = targetMap.get(target)?.get(key)
  if (dep) {
    triggerEffects(dep)
  }
}

export function triggerEffects(dep: Dep) {
  const effects: ReactiveEffect[] = isArray(dep) ? dep : [...dep]
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect)
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect)
    }
  }
}

/**
 * 触发指定依赖的副作用
 * @param effect
 */
export function triggerEffect(effect: ReactiveEffect) {
  if (effect.scheduler) {
    effect.scheduler()
  } else {
    effect.run()
  }
}

export function effect<T = any>(fn: () => T, options?: ReactiveEffectOptions) {
  const _effect = createReactiveEffect(fn)
  if (options) {
    extend(_effect, options)
  }
  if (!options || !options.lazy) {
    _effect.run()
  }
}

export function createReactiveEffect<T = any>(fn: () => T) {
  return new ReactiveEffect(fn)
}

export class ReactiveEffect<T = any> {
  computed?: ComputedRefImpl<T>

  constructor(private fn: () => T, public scheduler: EffectScheduler | null = null) {}

  run() {
    activeEffect = this
    // const res = this.fn()
    // activeEffect = undefined
    return this.fn()
  }
}
