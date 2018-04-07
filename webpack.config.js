const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const src = path.resolve(__dirname, 'src')
const demo = path.resolve(__dirname, 'demo')
const dist = path.resolve(__dirname, 'dist')

module.exports = {
  entry: path.resolve(demo, 'index.js'),
  output: {
    path: dist,
    filename: 'demo.bundle.js'
  },
  resolve: {
    alias: {
      'not-react': src
    }
  },
  devServer: {
    contentBase: dist,
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(demo, 'index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};