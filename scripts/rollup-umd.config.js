const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const postcss = require('rollup-plugin-postcss');
const path = require('path');
const { ROOT_PATH, SRC_PATH, transformCamelCase } = require('./utils/index');
const { name } = require('../package.json');

module.exports = {
  input: path.resolve(SRC_PATH, 'components/index.tsx'),
  output: {
    file: `dist/index.js`,
    format: 'umd',
    name: transformCamelCase(name),
  },
  plugins: [
    typescript({
      compilerOptions: {
        declaration: false,
        jsx: 'react',
      },
    }),
    postcss(),
    commonjs(),
  ],
  external: ['react', 'react-dom'],
};
