const env = process.env.NODE_ENV

const plugins = [
  ['@emotion/babel-plugin', { sourceMap: env === 'development' }]
]

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3.22'
      }
    ],
    ['@babel/preset-react']
  ],
  plugins
}
