const webpack = require('webpack')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, './src'),

  entry: {
    app: './index.jsx'
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: [
          path.resolve(__dirname, 'node_modules/rc-slider/'),
          path.resolve(__dirname, 'node_modules/react-contextmenu/')
        ],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.css/,
        include: [
          path.resolve(__dirname, 'node_modules/rc-slider/'),
          path.resolve(__dirname, 'node_modules/react-contextmenu/')
        ],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: false
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        exclude: /node_modules/,
        use: [{ loader: 'url-loader' }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new webpack.NamedModulesPlugin(),

    new HtmlWebpackPlugin({
      inject: true,
      template: 'index.html'
    })
  ],

  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    contentBase: './src',
    hot: true,
    port: 3000
  }
}
