const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');


export default () => ({

  devtool: 'inline-source-map',

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
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'url-loader' }
        ]
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
      template: 'index.html',
    })
  ],

  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    contentBase: './src',
    hot: true,
    port: 3000
  }
});


