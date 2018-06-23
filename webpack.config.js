const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./server/server.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['env'] }
      },
      
    ]
  }
}