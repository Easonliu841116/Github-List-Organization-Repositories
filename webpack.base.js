const { readdirSync } = require('fs')
const { resolve } = require('path')

const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const Webapckbar = require('webpackbar')
const isDev = process.env.NODE_ENV === 'development'

const config = {
  entry: {
    index: './app.js'
  },
  stats: isDev ? 'errors-only' : 'normal',
  devtool: isDev && 'eval-source-map',
  mode: process.env.NODE_ENV,
  target: 'browserslist',
  context: resolve(__dirname, 'src'),
  resolve: {
    alias: {
      '~': resolve(__dirname, ''),
      '@': resolve(__dirname, 'src')
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'all',
          enforce: true,
          priority: 10
        }
      }
    }
  },
  plugins: [
    new htmlWebpackPlugin({
      template: `./index.html`,
      filename: 'index.html',
      inject: 'body',
      chunks: ['vendor', 'index']
    }),
    new Webapckbar(),
    new ReactRefreshPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: isDev
          ? ['style-loader', 'css-loader']
          : [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: isDev
          ? [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              'postcss-loader',
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          : [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              'sass-loader'
            ]
      },
      {
        test: /\.m?js$/i,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|webp|svg|woff2?|ttf)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        }
      }
    ]
  }
}

module.exports = config
