import { EMPTY_OBJ, hasChanged, isObject } from '@avicii/shared'
import { isReactive } from '@avicii/reactivity'
import { queuePreFlushCb } from './scheduler'
import { ReactiveEffect } from 'packages/reactivity/src/effect'
export interface WatchOptions<immediate = boolean> {
  immediate?: immediate
  deep?: boolean
}

export function watch(source, cb: Function, options?: WatchOptions) {
  return doWatch(source, cb, options)
}

function doWatch(source, cb: Function, { immediate, deep }: WatchOptions = EMPTY_OBJ) {
  let getter: () => any
  if (isReactive(source)) {
    getter = () => source
    deep = true
  } else {
    getter = () => {}
  }

  if (cb && deep) {
    const baseGetter = getter
    getter = () => traverse(baseGetter())
  }

  let oldVal = {}
  const job = () => {
    if (cb) {
      const newVal = effect.run()
      if (deep || hasChanged(newVal, oldVal)) {
        console.log(newVal, '!!')
        cb(newVal, oldVal)
        oldVal = newVal
      }
    }
  }
  let scheduler = () => queuePreFlushCb(job)
  const effect = new ReactiveEffect(getter, scheduler)

  if (cb) {
    if (immediate) {
      job()
    } else {
      oldVal = effect.run()
    }
  } else {
    effect.run()
  }

  return () => {
    effect.stop()
  }
}

export function traverse(value: unknown) {
  if (!isObject(value)) {
    return value
  }
  for (const key in value as object) {
    traverse((value as object)[key])
  }
  return value
}

// export function traverse(value: unknown, seen?: Set<unknown>) {
//   if (!isObject(value) || (value as any)[ReactiveFlags.SKIP]) {
//     return value
//   }
//   seen = seen || new Set()
//   if (seen.has(value)) {
//     return value
//   }
//   seen.add(value)
//   if (isRef(value)) {
//     traverse(value.value, seen)
//   } else if (isArray(value)) {
//     for (let i = 0; i < value.length; i++) {
//       traverse(value[i], seen)
//     }
//   } else if (isSet(value) || isMap(value)) {
//     value.forEach((v: any) => {
//       traverse(v, seen)
//     })
//   } else if (isPlainObject(value)) {
//     for (const key in value) {
//       traverse(value[key], seen)
//     }
//   }
//   return value
// }
