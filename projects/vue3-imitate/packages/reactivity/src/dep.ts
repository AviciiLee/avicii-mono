/**
 * dep 只是reactEffect的集合
 * @description 依赖收集
 */
import { ReactiveEffect } from './effect'

export type Dep = Set<ReactiveEffect>

export const createDep = (effects?: ReactiveEffect[]): Dep => {
  const dep: Dep = new Set(effects) as Dep
  return dep
}
