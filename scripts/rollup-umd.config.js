const external = require('rollup-plugin-peer-deps-external');
const babel = require('@rollup/plugin-babel');
const injectProcessEnv = require('rollup-plugin-inject-process-env');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const postcss = require('rollup-plugin-postcss');
const path = require('path');
const { ROOT_PATH, SRC_PATH, transformCamelCase } = require('./utils/index');
const { name } = require('../package.json');
const { getBabelOutputPlugin } = babel;

module.exports = {
  input: path.resolve(SRC_PATH, 'components/index.tsx'),
  output: {
    file: `dist/index.js`,
    format: 'umd',
    name: transformCamelCase(name),
    // sourcemap: 'inline',
    globals: {
      react: 'React',
      // 'react-router': 'ReactRouter',
      'react-dom': 'ReactDOM',
    },
  },
  plugins: [
    typescript({
      compilerOptions: {
        declaration: false,
        declarationDir: null,
        jsx: 'react',
      },
    }),
    postcss(),
    babel(),
    commonjs(),
    resolve(),
    injectProcessEnv({
      NODE_ENV: 'production',
    }),
    babel({
      babelHelpers: 'runtime',
      presets: [['@babel/preset-env'], ['@babel/preset-react']],
      plugins: [['@babel/plugin-transform-runtime', { useESModules: false }]],
    }),
    external(),
  ],
  external: ['react', 'react-dom'],
};
