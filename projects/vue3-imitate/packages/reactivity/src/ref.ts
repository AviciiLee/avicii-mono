import { activeEffect, trackEffects, triggerEffects } from './effect'
import { Dep, createDep } from './dep'
import { toReactive } from './reactive'
import { hasChanged } from 'packages/shared/src'

export function ref<T>(value?: T) {
  return createRef(value, false)
}

export function createRef<T>(value: T, shallow) {
  if (isRef(value)) return value
  return new RefImpl(value, shallow)
}

export function trackRefValue(ref) {
  if (activeEffect) {
    trackEffects(ref.dep || (ref.dep = createDep()))
  }
}

export function triggerRefValue(ref) {
  triggerEffects(ref.dep)
}

export class RefImpl<T> {
  private _value: T
  private dep?: Dep = undefined
  public readonly __v_isRef = true
  private _rawValue: T
  constructor(value: T, public readonly __v_isShallow: boolean) {
    this._rawValue = __v_isShallow ? value : value
    this._value = __v_isShallow ? value : toReactive(value)
  }

  get value() {
    trackRefValue(this)
    return this._value
  }

  set value(newValue) {
    // 判断是否变化
    if (hasChanged(this._rawValue, newValue)) {
      this._rawValue = newValue
      this._value = this.__v_isShallow ? newValue : toReactive(newValue)
      triggerRefValue(this)
    }
  }
}

export const isRef = (value) => {
  return value ? value.__v_isRef === true : false
}
