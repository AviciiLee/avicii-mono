export const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null)
  },
  createElement: (tag) => document.createElement(tag),
  setElementText: (el: Element, text: string) => {
    el.textContent = text
  }
}
