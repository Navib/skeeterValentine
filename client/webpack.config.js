const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const extractPlugin = new extractPlugin({ filename: './style.css' });

module.exports = {
  entry: './index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  context: path.resolve(__dirname, 'public'),
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    stat: 'errors-only',
    open: true,
    port: 8080,
    compress: true,
    historyApiFallback: true
  },
  plugins: [
    new CleanWebpackPlugin(['public']),
    new HtmlWebpackPlugin({ template: 'index.html' }),
    extractPlugin
  ],
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|svg)$/,
        exclue: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMAp: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer('last 2 version')],
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        user: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-0', 'react']
          }
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: true })
    ]
  }
};
