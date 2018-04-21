var path = require('path');
var CleanPlugin = require('clean-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: ['babel-polyfill', './scripts/index'],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'scripts/game.js',
    sourceMapFilename: '[file].map'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel?presets[]=es2015'
    }]
  },
  plugins: [
    new CleanPlugin(['build']),
    new CopyPlugin([
      { from: 'static' },
      { from: 'assets' },
      { from: '../node_modules/phaser/build/phaser.min.js' }
    ])
  ]
};
