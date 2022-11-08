const terser = require('@rollup/plugin-terser');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const postcss = require('rollup-plugin-postcss');
const babel = require('@rollup/plugin-babel');

const path = require('path');
const { ROOT_PATH, SRC_PATH, getEntry } = require('./utils/index');

const inputs = getEntry();

const configs = Object.keys(inputs).map((key) => ({
  input: inputs[key],
  output: {
    file: `lib/${key}.js`,
    format: 'cjs',
  },
  plugins: [
    typescript(),
    postcss({
      extensions: ['.css', '.less'],
    }),
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      presets: [['@babel/preset-env'], ['@babel/preset-react']],
      plugins: [['@babel/plugin-transform-runtime', { useESModules: false }]],
    }),
    // terser(),
  ],
  external: ['react', 'react-dom'],
}));

module.exports = configs;
