import { ShapeFlags, isArray, isFunction, isObject, isString } from '@avicii/shared'
import { normalizeClass } from './normalizeProp'
export interface VNode {
  __v_isVNode: true
  type: any
  props: any
  children: any
  shapeFlag: number
  key: any
}

export const Text = Symbol('Text')
export const Fragment = Symbol('Fragment')
export const Comment = Symbol('Comment')

export function isVNode(value): value is VNode {
  return value ? value.__v_isVNode === true : false
}

export function createVNode(type: any, props?: any, children?: any): VNode {
  if (props) {
    let { class: klass, style } = props
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass)
    }
  }
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

export function isSameVNodeType(n1: VNode, n2: VNode) {
  return n1.type === n2.type && n1.key === n2.key
}
