const env = process.env.NODE_ENV

const plugins = [
  ['@emotion/babel-plugin', { sourceMap: env === 'development' }]
]

if (env === 'development') plugins.push('react-refresh/babel')

module.exports = {
  presets: [
    /**
     * https://babeljs.io/docs/en/babel-preset-env#browserslist-integration
     */
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3.22'
      }
    ],
    /**
     * Runtime automatic with React 17+ allows not importing React
     * in files only using JSX (no state or React methods)
     */
    ['@babel/preset-react']
  ],
  plugins
}
