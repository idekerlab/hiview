const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
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
    new HtmlWebpackPlugin({
      inject: true,
      moduleIds: 'named',
      template: 'index.html'
    })
  ],

  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    static: {
      directory: path.join(__dirname, 'build'),
    },
    compress: true,
    hot: true,
    port: 3000
  }
}
