var path = require('path');
// var webpack = require('webpack');

var config = {
  entry: {
    // index: './src/index.js'
    // base64: './src/base64/index.js'
    bridge: './src/bridge/index.js',
    location: './src/location/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
};
module.exports = config;
