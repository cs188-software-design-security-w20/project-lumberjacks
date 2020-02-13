const webpackMerge = require('webpack-merge');

module.exports = () =>
  webpackMerge(
    {
      mode: 'production',
      // CHANGE THE API_BASE FOR PROUDCTION.
      plugins: [
        new webpack.DefinePlugin({
          API_BASE: JSON.stringify('http://0.0.0.0:5000/'),
        }),
      ],
    },
    require('./presets/webpack.svg.js')(),
  );
