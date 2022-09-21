const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpackMerge = require("webpack-merge");
const path = require("path");
const fs = require("fs");
const webpack = require("webpack");

const { plugins, presets } = require("./babel/umd");
const baseConfig = require("./webpack.base");
const { ROOT_PATH, SRC_PATH } = require("./utils/index");

// const entry = path.resolve(SRC_PATH, "./index.tsx");
// const packageJson = require("../package.json");
// const { name } = packageJson;

const IGNORE_PATH = ["index.tsx","react-app-env.d.ts"];

const getEntry = () => {
  const result = {};
  const componentsPath = path.resolve(SRC_PATH, "./components");
  const res = fs.readdirSync(componentsPath);
  res.forEach((item) => {
    if (!IGNORE_PATH.includes(item)) {
      result[item] = path.resolve(componentsPath, item, "./index.tsx");
    }
  });
  console.log(Object.keys(result).length + " components packing!");
  console.log(result);
  return result;
};

const config = {
  mode: "production",
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
      root: "ReactDOM",
    },
  },
  entry: getEntry(),
  output: {
    publicPath: "",
    filename: "./[name]/index.js",
    // library: name,
    libraryTarget: "commonjs2",
    path: path.resolve(ROOT_PATH, "lib"),
  },
  module: {
    rules: [
      {
        test: /\.[jt]s(x)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "thread-loader",
          },
          {
            loader: "babel-loader",
            options: {
              presets: presets,
              plugins: plugins,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff|woff2|eot|ttf)$/,
        type: "asset/inline",
      },
    ],
  },
  optimization: {
    minimize: true,
    sideEffects: true,
    nodeEnv: "production",
    minimizer: [
      new TerserPlugin({
        parallel: require("os").cpus().length,
        terserOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify("production"),
    }),
  ],
};

const mergedConfig = webpackMerge.merge(baseConfig, config);
module.exports = mergedConfig;