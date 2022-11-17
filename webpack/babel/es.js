const presets = [
  [
    '@babel/preset-env',
    {
      modules: false,
    },
  ],
  ['@babel/preset-react', { runtime: 'automatic' }],
  [
    '@babel/preset-typescript',
    {
      allowDeclareFields: true,
    },
  ],
];

const plugins = [
  [
    '@babel/plugin-transform-runtime',
    {
      useESModules: true,
    },
  ],
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-nullish-coalescing-operator',
  [
    '@babel/plugin-proposal-decorators',
    {
      legacy: true,
    },
  ],
  '@babel/plugin-proposal-class-properties',
];

module.exports = {
  presets,
  plugins,
};
