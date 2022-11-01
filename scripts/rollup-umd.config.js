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
    sourcemap: 'inline',
  },
  plugins: [
    typescript({
      compilerOptions: {
        declaration: false,
        jsx: 'react',
      },
    }),
    postcss(),
    // babel({
    //   presets: ['@babel/preset-env', '@babel/preset-react'],
    // }),
    commonjs(),
    resolve(),
    injectProcessEnv({
      NODE_ENV: 'production',
    }),
  ],
  external: ['react', 'react-dom'],
  globals: {
    react: 'React',
    'react-router': 'ReactRouter',
  },
};
