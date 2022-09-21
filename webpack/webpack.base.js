const path = require("path");
const webpack = require("webpack");
const webpackbar = require("webpackbar");
const { ROOT_PATH } = require("./utils/index");

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@": path.resolve(ROOT_PATH, "src"),
    },
  },
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: "thread-loader",
          },
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(ROOT_PATH, "./postcss.config.js"),
              },
            },
          },
        ],
      },
      {
        test: /\.svga$/,
        use: { loader: "url-loader" },
      },
    ],
  },
  plugins: [new webpackbar()],
};
