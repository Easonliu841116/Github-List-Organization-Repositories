const { merge } = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const common = require('./webpack.base')

module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  devServer: {
    compress: false,
    watchFiles: ['src'],
    host: '0.0.0.0',
    port: 8087,
    liveReload: true,
    historyApiFallback: {
      index: '/dist/index.html'
    },
    proxy: {
      // '/mock_api': {
      //   target: 'http://localhost:8887',
      //   changeOrigin: true
      // },
    }
  }
})
