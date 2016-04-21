var path = require('path');
// var webpack = require('webpack');

var config = {
  entry: {
    // index: './src/index.js'
    // base64: './src/base64/index.js'
    // toast: './toast/index.js',
    // M: './M/index.js'
    zepto: './zepto/index.js'
    // platform: './platform/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
};
module.exports = config;
