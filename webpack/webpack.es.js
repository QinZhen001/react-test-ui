const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpackMerge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const fs = require("fs");

const { presets, plugins } = require("./babel/es");
const baseConfig = require("./webpack.base");
const { ROOT_PATH, SRC_PATH, getEntry } = require("./utils/index");

const config = {
  mode: "production",
  entry: getEntry(),
  externals: {
    react: "react",
    "react-dom": "react-dom",
  },
  externalsType: "module",
  output: {
    filename: "./components/[name]/index.js",
    library: {
      type: "module",
    },
    libraryTarget: "module",
    path: path.resolve(ROOT_PATH, "es"),
  },
  experiments: {
    outputModule: true,
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
