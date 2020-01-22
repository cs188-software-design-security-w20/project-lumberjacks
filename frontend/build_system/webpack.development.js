const webpackMerge = require('webpack-merge');

module.exports = () =>
  webpackMerge({
    mode: 'development',
    devtool: 'cheap-module-source-map',
  });
