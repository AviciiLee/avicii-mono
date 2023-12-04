import { createRenderer } from '@avicii/runtime-core'
import { nodeOps } from './NodeOps'
import { patchProps } from './patchProps'
import { extend } from '@avicii/shared'

const rendererOptions = extend({ patchProps }, nodeOps)
let rederer
function ensureRenderer() {
  return rederer || (rederer = createRenderer(rendererOptions))
}
export const render = (...args) => {
  ensureRenderer().render(...args)
}
