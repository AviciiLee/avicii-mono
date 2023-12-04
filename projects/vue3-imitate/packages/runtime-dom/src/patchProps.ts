import { isOn } from '@avicii/shared'
import { patchClass } from './modules/class'
import { patchDomProp } from './modules/props'
import { patchAttr } from './modules/attr'
import { patchStyle } from './modules/style'

export const patchProps = (el: Element, key, prevValue, nextValue) => {
  if (key === 'class') {
    patchClass(el, nextValue)
  } else if (key === 'style') {
    patchStyle(el, prevValue, nextValue)
  } else if (isOn(key)) {
    // patchEvent() 10 /16
  } else if (shouldSetAsProp(el, key)) {
    patchDomProp(el, key, nextValue)
  } else {
    patchAttr(el, key, nextValue)
  }
}

function shouldSetAsProp(el: Element, key: string): boolean {
  if (key === 'form') {
    return false
  }
  if (key === 'list' && el.tagName === 'INPUT') {
    return false
  }

  if (key === 'type' && el.tagName === 'TEXTAREA') {
    return false
  }
  return key in el
}
