import { ShapeFlags, isArray, isFunction, isObject, isString } from '@avicii/shared'

export interface VNode {
  __v_isVNode: true
  type: any
  props: any
  children: any
  shapeFlag: number
}

export const Text = Symbol('Text')
export const Fragment = Symbol('Fragment')
export const Comment = Symbol('Comment')

export function isVNode(value): value is VNode {
  return value ? value.__v_isVNode === true : false
}

export function createVNode(type: any, props?: any, children?: any): VNode {
  const shapeFlag = isString(type)
    ? ShapeFlags.ELEMENT
    : isObject(type)
    ? ShapeFlags.STATEFUL_COMPONENT
    : 0
  return createBaseVNode(type, props, children, shapeFlag)
}

function createBaseVNode(type: any, props: any, children: any, shapeFlag: number): VNode {
  const vNode: VNode = {
    __v_isVNode: true,
    type,
    props,
    shapeFlag
  } as VNode
  normalizeChildren(vNode, children)

  return vNode
}

export function normalizeChildren(vNode: VNode, children: any) {
  let type = 0
  // const { shapeFlag } = vNode
  if (children == null) {
    children = null
  } else if (isArray(children)) {
    type = ShapeFlags.ARRAY_CHILDREN
  } else if (isObject(children)) {
  } else if (isFunction(children)) {
  } else {
    children = String(children)
    type = ShapeFlags.TEXT_CHILDREN
  }
  vNode.children = children
  vNode.shapeFlag |= type
}
