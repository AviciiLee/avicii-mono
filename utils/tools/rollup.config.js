import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import babel from "@rollup/plugin-babel";

const extensions = [".js", ".ts"];

export default [
  // commonjs
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.cjs",
      format: "cjs",
    },
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      resolve({ extensions }),
      commonjs(),
      json(),
    ],
  },
  // esm
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.esm.js",
      format: "esm",
    },
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      resolve({ extensions }),
      commonjs(),
      json(),
    ],
  },
  // browser
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.browser.js",
      format: "iife",
      name: "utils",
    },
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      resolve({ extensions }),
      commonjs(),
      json(),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        extensions,
        presets: [
          [
            "@babel/preset-env",
            {
              targets: "> 0.25%, not dead",
            },
          ],
        ],
      }),
    ],
  },
];
