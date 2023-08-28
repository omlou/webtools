import terser from "@rollup/plugin-terser"
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from "@rollup/plugin-json"
import dts from 'rollup-plugin-dts'

const name = "webtools"
const globalName = "webtools"
const commonPlugins = [
  resolve(),
  commonjs(),
  json(),
  typescript()
]

const config = [
  {
    input:"src/index.umd.ts",
    output:[
      {
        file: `dist/umd/${name}.js`,
        format: 'umd',
        name: globalName,
      },
      {
        file: `dist/umd/${name}.min.js`,
        format: 'umd',
        name: globalName,
        sourcemap: true,
        plugins: [terser()]
      }
    ],
    plugins: commonPlugins
  },
  {
    input:"src/index.ts",
    output:[
      {
        file: `dist/es/${name}.js`,
        format: 'es'
      },
      {
        file: `dist/es/${name}.min.js`,
        format: 'es',
        sourcemap: true,
        plugins: [terser()]
      }
    ],
    plugins: commonPlugins
  },
  {
    input: "src/index.ts",
    output: {
      file: 'index.d.ts',
      format: 'es',
    },
    plugins: [dts()]
  }
]

export default config