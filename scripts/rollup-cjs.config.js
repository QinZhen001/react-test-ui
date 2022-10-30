const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const postcss = require('rollup-plugin-postcss');
const path = require('path');
const { ROOT_PATH, SRC_PATH, getEntry } = require('./utils/index');

const inputs = getEntry();

const configs = Object.keys(inputs).map((key) => ({
  input: inputs[key],
  output: {
    file: `lib/${key}.js`,
    format: 'cjs',
  },
  plugins: [typescript(), postcss(), resolve(), commonjs()],
  external: ['react', 'react-dom', 'react/jsx-runtime'],
}));

module.exports = configs;
