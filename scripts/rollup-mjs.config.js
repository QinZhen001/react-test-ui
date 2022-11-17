const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const babel = require('@rollup/plugin-babel');
const postcss = require('rollup-plugin-postcss');
const terser = require('@rollup/plugin-terser');
const { getBabelOutputPlugin } = babel;

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
        declarationDir: null,
      },
    }),
    postcss({
      extensions: ['.css', '.less'],
    }),
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      presets: [['@babel/preset-env'], ['@babel/preset-react']],
      plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
    }),
    // terser(),
  ],
  external: ['react', 'react-dom'],
}));

module.exports = configs;
