const path = require('path');

module.exports = {
  entry: './lib/cloud_jumper.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.(s*)css$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader", options: {
          sourceMap: true
        }
      }, {
        loader: "sass-loader", options: {
          sourceMap: true
        }
      }]
    }]
  }
};