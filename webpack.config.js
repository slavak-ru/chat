'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let pathsToClean = [
  'dev',
  'public'
]

function addHash(template, hash) {
  return NODE_ENV == 'production' ?
      template.replace(/\.[^.]+$/, `.[${hash}]$&`) : `${template}?hash=[${hash}]`;
}

module.exports = {
  context: __dirname + '/src',

  mode: NODE_ENV,

  entry: {
    index: './index',
  },

  output: {
    path: path.resolve(NODE_ENV == 'production' ? __dirname + '/public' : __dirname + '/dev'),
    publicPath: NODE_ENV == 'production' ? './' : '/',
    filename: addHash('[name].js', 'hash:6'),
    chunkFilename: '[id].js'
  },

  watch: NODE_ENV == 'development',

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : false,

  plugins: [ 
    new CleanWebpackPlugin(pathsToClean, {} ), // Clean 'dev' directory
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      LANG:     JSON.stringify('ru')
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: addHash('[name].css', 'hash:6'),
      chunkFilename: addHash('[id].css', 'hash:6'),
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: false,
      template: './chat.html',
      filename: 'index.html',
      title: 'CHAT'
    })
  ],

  resolve: {
    modules: ['node_modules'],
    //modulesDirectories: ['node_modules'],
    extensions: ['.js']
  },

  resolveLoader: {
    moduleExtensions: ['-loader'],
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                'targets': {
                  // The % refers to the global coverage of users from browserslist
                  'browsers': [ '>3%']
                }
              }]
            ],
            plugins: ['transform-runtime'],
          }
        }
      },
      {
        test:   /\.pug$/,
        use: { 
          loader: 'pug-loader', 
          query: {} // Can be empty
        } 
      },
      {
        test:/\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    autoprefixer({
                        browsers:['ie >= 11', 'last 3 version']
                    })
                ],
                sourceMap: true
            }
          },
        ]  
      },
      {
        test:/\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    autoprefixer({
                        browsers:['ie >= 11', 'last 3 version']
                    })
                ],
                sourceMap: true
            }
          },
        ]  
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: addHash('file?name=[path][name].[ext]', 'hash:6'),
              //outputPath: 'images/'
            }
          }
        ]
      }
    ]
  },

  devServer: {
    host: 'localhost', // default
    port: 8080, // default
    open: true,
    //contentBase: path.join(__dirname, 'public'),
    //hot: true
  }

}


// Uglify
if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          // don't show unreachable variables etc
          warnings:     false,
          drop_console: true,
          unsafe:       true
        }
      }
    })
  )
}