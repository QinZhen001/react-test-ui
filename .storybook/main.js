const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-actions",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  framework: "@storybook/react",
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  webpackFinal: async (config) => {
    // config.module.rules.push({
    //   test: /\.(ts|tsx)$/,
    //   loader: require.resolve("babel-loader"),
    //   // options: {
    //   //   babelrc: true,
    //   // },
    // });
    // config.module.rules.push({
    //   test: /\.css$/,
    //   use: [
    //     {
    //       loader: "postcss-loader",
    //       options: {
    //         postcssOptions: {
    //           plugins: [require("tailwindcss"), require("autoprefixer")],
    //         },
    //       },
    //     },
    //   ],
    //   include: path.resolve(__dirname, "../*"),
    // });
    config.module.rules.push({
      test: /\.(svga)$/,
      loader: require.resolve("url-loader"),
    });
    config.resolve.extensions.push(".ts", ".tsx", ".js");
    return config;
  },
  core: {
    builder: "webpack5",
  },
};
