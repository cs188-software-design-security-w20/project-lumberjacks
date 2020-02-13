const webpackMerge = require('webpack-merge');
const webpack = require('webpack');

module.exports = () =>
  webpackMerge(
    {
      mode: 'development',
      devtool: 'cheap-module-source-map',
      plugins: [
        new webpack.DefinePlugin({
          API_BASE: JSON.stringify('http://0.0.0.0:5000/'),
        }),
      ],
    },
    require('./presets/webpack.svg.js')(),
  );
