const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const assetsPath = path.resolve(__dirname, '../public')
const host = process.env.IP || 'localhost'
const port = parseInt(process.env.PORT, 10) || 3000

module.exports = {
  // devtool: 'inline-source-map',
  devtool: 'eval',
  context: path.resolve(__dirname, '..'),
  entry: [
    `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`,
    './client/app',
  ],
  output: {
    path: assetsPath,
    pathinfo: true,
    filename: 'bundle.js',
    publicPath: `http://${host}:${port}/public/`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'cache-loader',
          {
            loader: 'babel-loader',
            options: {
              plugins: ['transform-decorators-legacy'],
              presets: ['es2015', 'stage-0', 'react'],
            },
          },
        ],
      },

      {
        test: /\.html$/,
        loader: 'html-loader',
      },

      // {
      //   test: /\.scss$/,
      //   use: ['style-loader', 'css-loader', postcss, 'sass-loader']
      // },

      // { test: /\.css$/, use: ['style-loader', 'css-loader', postcss] },

      { test: /\.(png|jpg|gif|wav|mp3)$/, loader: 'file-loader' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader', options: { limit: 10000, mimetype: 'octet-stream' } },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader', options: { limit: 10000, mimetype: 'image/svg+xml' } },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './client/index.html',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
}
