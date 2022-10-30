const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const postcss = require('rollup-plugin-postcss');

const { ROOT_PATH, SRC_PATH, getEntry } = require('./utils/index');

const inputs = getEntry();

const configs = Object.keys(inputs).map((key) => ({
  input: inputs[key],
  output: {
    file: `es/${key}.js`,
    format: 'es',
  },
  plugins: [
    typescript({
      compilerOptions: {
        declaration: false,
      },
    }),
    postcss(),
    commonjs(),
  ],
  external: ['react', 'react-dom', 'react/jsx-runtime'],
}));

module.exports = configs;
