const webpack = require('webpack');
const path = require('path');
const prod = process.argv.indexOf('-p') !== -1;

module.exports =  {
  devtool: prod ? 'source-map' : 'eval',
  context: path.resolve(__dirname, './'),
  entry: {
    js: './src/index.js'
    //vendor: ['react']
  },
  output: {
    path: path.resolve(__dirname, './'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: ['/node_modules/']
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
