/*
*  ./webpack.config.js
*/
const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: './app/js/index.js',
  output: {
   path: path.resolve('dist'),
   filename: 'index_bundle.js'
  },
  module: {
    rules: [
     {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
     },
     {
      test: /\.jsx$/,
      loader: 'babel-loader',
      exclude: /node_modules/
     }
    ]
  }
}
