import { isFunction } from '@avicii/shared'
import { Dep } from './dep'
import { ReactiveEffect } from './effect'
import { trackRefValue, triggerRefValue } from './ref'

export type ComputedGetter<T> = (...args: any[]) => T
export type ComputedSetter<T> = (v: T) => void

export interface WritableComputedOptions<T> {
  get: ComputedGetter<T>
  set: ComputedSetter<T>
}

export function computed<T>(getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>) {
  let getter: ComputedGetter<T>
  let setter: ComputedSetter<T>
  const onlyGetter = isFunction(getterOrOptions)
  if (onlyGetter) {
    getter = getterOrOptions as ComputedGetter<T>
    setter = () => {
      console.warn('Write operation failed: computed value is readonly')
    }
  } else {
    getter = (getterOrOptions as WritableComputedOptions<T>).get
    setter = (getterOrOptions as WritableComputedOptions<T>).set
  }
  const cRef = new ComputedRefImpl(getter)
  return cRef
}

export class ComputedRefImpl<T> {
  public dep?: Dep = undefined
  private _value!: T
  public readonly effect: ReactiveEffect<T>
  public readonly __v_isRef = true
  public _dirty = true

  constructor(getter: ComputedGetter<T>) {
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true
        triggerRefValue(this)
      }
    })
    this.effect.computed = this
  }

  get value() {
    trackRefValue(this)
    if (this._dirty) {
      this._dirty = false
      this._value = this.effect.run()
    }
    return this._value
  }
}
