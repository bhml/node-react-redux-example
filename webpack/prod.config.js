const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const relativeAssetsPath = '../dist/public/'
const assetsPath = path.join(__dirname, relativeAssetsPath)

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: [
    './client/app.js',
  ],
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/public/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['cache-loader', 'babel-loader'],
      },

      {
        test: /\.html$/,
        loader: 'html-loader',
      },

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
    // copy static files in ./public into the production build
    new CopyWebpackPlugin([
      { from: 'public' },
    ]),

    // use AssetsWebpackPlugin instead for universal react/SSR
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: '../index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['$super', '$', 'exports', 'require'],
      },
    }),
  ],
}
