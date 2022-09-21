const presets = [
    ["@babel/preset-env"],
    ["@babel/preset-react"],
    [
      "@babel/preset-typescript",
      {
        allowDeclareFields: true,
      },
    ],
  ];
  
  const plugins = [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    "@babel/plugin-proposal-class-properties",
  ];
  
  
   module.exports = {
      presets,
      plugins
   }