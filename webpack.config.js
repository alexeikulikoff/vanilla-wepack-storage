const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    './src/app.js',
    './src/app.css'
 	
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
       
      },
      {
		test: /\.css$/i,
        use: ['style-loader', 'css-loader'],       

      }
    ]
  }
};