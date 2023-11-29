import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: './packages/vue/src/index.ts',
  output: [
    {
      file: './packages/vue/dist/vue.js',
      format: 'iife',
      name: 'Vue',
      sourcemap: true
    }
  ],
  plugins: [resolve(), commonjs(), typescript()]
}
