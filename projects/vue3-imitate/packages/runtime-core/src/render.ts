import { ShapeFlags } from '@avicii/shared'
import { Comment, Fragment, Text, VNode } from './vnode'

export interface RedererOptions {
  patchProps(el: Element, key: string, preValue: any, nextValue: any): void
  setElementText(node: Element, text: string): void
  insert(el: Element, parent: Element, anchor): void
  createElement(type: string): Element
}

export function createRenderer(options: RedererOptions) {
  return baseCreateRenderer(options)
}

function baseCreateRenderer(options: RedererOptions): any {
  const {
    insert: hostInsert,
    patchProps: hostPathProp,
    createElement: hostCreateElement,
    setElementText: hostSetElementText
  } = options
  const processElement = (oldVnode, newVnode, container: Element, anchor = null) => {
    if (oldVnode === null) {
      mountElement(newVnode, container, anchor)
    } else {
      // patchElement(oldVnode, newVnode, container)
    }
  }
  const mountElement = (vnode, container: Element, anchor = null) => {
    const { type, props, children, shapeFlag } = vnode
    // 创建元素
    const el = (vnode.el = hostCreateElement(type))
    // 处理属性
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      hostSetElementText(el, children)
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    }
    // 处理属性
    if (props) {
      for (const key in props) {
        hostPathProp(el, key, null, props[key])
      }
    }
    hostInsert(el, container, anchor)
  }
  const path = (oldVnode: VNode, newVnode, container: Element, anchor = null) => {
    if (oldVnode === newVnode) {
      return
    }
    const { type, shapeFlag } = newVnode
    switch (type) {
      case Text:
        break
      case Comment:
        break
      case Fragment:
        break
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(oldVnode, newVnode, container, anchor)
        } else if (shapeFlag & ShapeFlags.COMPONENT) {
        }
    }
  }

  const render = (vnode: VNode, container) => {
    if (vnode === null) {
    } else {
      path(container._vnode || null, vnode, container)
    }
    container._vnode = vnode
  }
  return {
    render
  }
}
