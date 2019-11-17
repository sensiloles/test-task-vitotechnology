import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import autoprefixer, { Autoprefixer } from 'autoprefixer';

const isProduction =
  process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';
const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './build');

module.exports = {
  mode: isProduction ? 'production' : 'development',
  context: sourcePath,
  devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map',
  entry: sourcePath,
  output: {
    path: outPath,
    filename: isProduction ? '[contenthash].js' : '[hash].js',
    chunkFilename: isProduction ? '[name].[contenthash].js' : '[name].[hash].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx', '.json'],
    mainFields: ['module', 'browser', 'main']
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    contentBase: sourcePath,
    port: 4242,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal',
    clientLogLevel: 'warning'
  },
  node: {
    fs: 'empty',
    net: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_modules)/,
        include: sourcePath,
        use: 'babel-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader?sourceMap=true',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (): [Autoprefixer] => [autoprefixer]
            }
          },
          'sass-loader'
        ]
      },
      { test: /\.html$/, use: 'html-loader' },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'assets/index.html',
      favicon: 'assets/images/favicon.ico',
      minify: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true
      },
      append: {
        head: '<script src="//cdn.polyfill.io/v3/polyfill.min.js"></script>'
      }
    })
  ]
};
