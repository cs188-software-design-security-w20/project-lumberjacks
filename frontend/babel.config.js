const createConfig = api => {
  api.cache(false);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry', // uses local version of core-js
          corejs: 3, // specifies version of core js to use
          targets: {
            node: 'current', // specifies that we are supporting only current node versions
          },
        },
      ],
    ],
    plugins: [
      '@babel/plugin-transform-react-display-name',
      '@babel/plugin-syntax-jsx',
      '@babel/plugin-transform-react-jsx',
    ],
  };
};

module.exports = createConfig;
