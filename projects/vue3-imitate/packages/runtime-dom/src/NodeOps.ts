export const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null)
  },
  createElement: (tag) => document.createElement(tag),
  setElementText: (el: Element, text: string) => {
    el.textContent = text
  },
  remove: (child) => {
    const parent = child.parentNode
    if (parent) {
      parent.removeChild(child)
    }
  },
  createText: (text) => document.createTextNode(text),
  setText: (node, text) => {
    node.nodeValue = text
  },
  createComment: (comment) => document.createComment(comment)
}
