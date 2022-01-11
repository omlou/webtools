const path = require('path')
module.exports = {
  mode:'production',
  entry: {
    app: './clear-viewport.ts'
  },
  output: {
    path: path.resolve(__dirname,'./dist'),
    filename: 'clear-viewport.min.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts','.tsx','.js']
  }
}