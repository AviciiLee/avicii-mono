import { EMPTY_OBJ, ShapeFlags } from '@avicii/shared'
import { Comment, Fragment, Text, VNode, isSameVNodeType } from './vnode'
import { normalizeVNode } from './componentRederUtils'

export interface RedererOptions {
  patchProps(el: Element, key: string, preValue: any, nextValue: any): void
  setElementText(node: Element, text: string): void
  insert(el: Element, parent: Element, anchor): void
  createElement(type: string): Element
  remove(el: Element)
  createText(text: string)
  setText(node, text)
  createComment(text: string)
}

export function createRenderer(options: RedererOptions) {
  return baseCreateRenderer(options)
}

function baseCreateRenderer(options: RedererOptions): any {
  const {
    insert: hostInsert,
    patchProps: hostPatchProp,
    createElement: hostCreateElement,
    setElementText: hostSetElementText,
    remove: hostRemove,
    createText: hostCreateText,
    setText: hostSetText,
    createComment: hostCreateComment
  } = options

  const processFragment = (oldVnode, newVnode, container: Element, anchor = null) => {
    if (oldVnode === null) {
      mountChildren(newVnode.children, container, anchor)
    } else {
      patchChildren(oldVnode, newVnode, container, anchor)
    }
  }

  const mountChildren = (children, container, anchor) => {
    if (typeof children === 'string') {
      children = children.split('')
    }
    console.log(children, '@')
    for (let index = 0; index < children.length; index++) {
      const child = (children[index] = normalizeVNode(children[index]))
      console.log(child, '!@')
      patch(null, child, container, anchor)
    }
  }

  const processComment = (oldVnode, newVnode, container: Element, anchor = null) => {
    if (oldVnode === null) {
      newVnode.el = hostCreateComment(newVnode.children as string) || ''
      hostInsert(newVnode.el, container, anchor)
    } else {
      newVnode.el = oldVnode.el
      // needn't support
    }
  }

  const processText = (oldVnode, newVnode, container: Element, anchor = null) => {
    if (oldVnode === null) {
      newVnode.el = hostCreateText(newVnode.children)
      hostInsert(newVnode.el, container, anchor)
    } else {
      const el = (newVnode.el = oldVnode.el)
      if (newVnode.children != oldVnode.children) {
        hostSetText(el, newVnode.children)
      }
    }
  }

  const processElement = (oldVnode, newVnode, container: Element, anchor = null) => {
    if (oldVnode === null) {
      mountElement(newVnode, container, anchor)
    } else {
      patchElement(oldVnode, newVnode)
    }
  }
  const patchElement = (oldVnode, newVnode) => {
    const el = (newVnode.el = oldVnode.el)
    const oldProps = oldVnode.props || {}
    const newProps = newVnode.props || {}
    patchChildren(oldVnode, newVnode, el, null)
    patchProps(el, newVnode, oldProps, newProps)
  }

  const patchProps = (el, vnode, oldProps, newProps) => {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        const prev = oldProps[key]
        const next = newProps[key]
        if (prev !== next) {
          hostPatchProp(el, key, prev, next)
        }
      }
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null)
          }
        }
      }
    }
  }

  const patchChildren = (oldVnode, newVnode, container, anchor) => {
    const c1 = oldVnode && oldVnode.children
    const prevShapeFlag = oldVnode && oldVnode.shapeFlag
    const c2 = newVnode && newVnode.children
    const { shapeFlag } = newVnode

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // 移除老节点
      }

      // 新旧节点都是文本
      if (c2 !== c1) {
        hostSetElementText(container, c2)
      }
    } else {
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // 新旧节点都是数组
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          // diff
        } else {
          // 移除老节点
        }
      } else {
        if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
          // 移除老节点text
          hostSetElementText(container, '')
        }
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          // todo单独新子节点的挂载
        }
      }
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
        hostPatchProp(el, key, null, props[key])
      }
    }
    hostInsert(el, container, anchor)
  }
  const patch = (oldVnode, newVnode, container: Element, anchor = null) => {
    if (oldVnode === newVnode) {
      return
    }

    if (oldVnode && !isSameVNodeType(oldVnode, newVnode)) {
      unmount(oldVnode)
      oldVnode = null
    }

    const { type, shapeFlag } = newVnode
    switch (type) {
      case Text:
        processText(oldVnode, newVnode, container, anchor)
        break
      case Comment:
        processComment(oldVnode, newVnode, container, anchor)
        break
      case Fragment:
        processFragment(oldVnode, newVnode, container, anchor)
        break
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(oldVnode, newVnode, container, anchor)
        } else if (shapeFlag & ShapeFlags.COMPONENT) {
        }
    }
  }

  const unmount = (vnode) => {
    hostRemove(vnode.el)
  }

  const render = (vnode: VNode, container) => {
    if (vnode === null) {
      if (container._vnode) {
        hostRemove(container._vnode.el)
      }
    } else {
      patch(container._vnode || null, vnode, container)
    }
    container._vnode = vnode
  }
  return {
    render
  }
}
