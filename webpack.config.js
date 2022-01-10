const path = require('path')
module.exports = {
  mode:'production',
  entry: {
    app: './index.d.ts'
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].[contenthash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules|\.d\.ts$/
        // include: [path.resolve(__dirname, '..', '')]
      },
      {
        test: /\.d\.ts$/,
        loader: 'ignore-loader'
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
}