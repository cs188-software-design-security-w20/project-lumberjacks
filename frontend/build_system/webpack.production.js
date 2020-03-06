const webpackMerge = require('webpack-merge');
const webpack = require('webpack');

module.exports = () =>
  webpackMerge(
    {
      mode: 'production',
      // CHANGE THE API_BASE FOR PROUDCTION.
      plugins: [
        new webpack.DefinePlugin({
          API_BASE: JSON.stringify('http://0.0.0.0:5000/'),
          DEBUG: false,
        }),
      ],
    },
    require('./presets/webpack.svg.js')(),
  );
