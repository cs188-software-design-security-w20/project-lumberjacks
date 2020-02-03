const webpackMerge = require('webpack-merge');

module.exports = () =>
  webpackMerge({
    mode: 'production',
  });
