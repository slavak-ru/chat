'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

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
      title: 'CHAT',
    }),
    new FaviconsWebpackPlugin({
      // Your source logo
      logo: './my-logo.png',
      appName: 'CHAT',                            // Your application's name. `string`
      appDescription: 'CHAT - the single page application on js-components',                     // Your application's description. `string`
      developerName: 'Vyacheslav Knyazev',                      // Your (or your developer's) name. `string`
      developerURL: 'https://github.com/slavak-ru',                       // Your (or your developer's) URL. `string`
      dir: "auto",                              // Primary text direction for name, short_name, and description
      lang: "en-US",                            // Primary language for name and short_name
      background: "#fff",                       // Background colour for flattened icons. `string`
      theme_color: "#fff",                      // Theme color user for example in Android's task switcher. `string`
      appleStatusBarStyle: "black-translucent", // Style for Apple status bar: "black-translucent", "default", "black". `string`
      display: "standalone",                    // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
      orientation: "portrait",                       // Default orientation: "any", "natural", "portrait" or "landscape". `string`
      start_url: "/?homescreen=1",              // Start URL when launching the application from a device. `string`
      version: "1.0",                           // Your application's version string. `string`
      logging: false,                           // Print logs to console? `boolean`  
      // Inject the html into the html-webpack-plugin
      inject: true,
      // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
      background: '#fff',
      // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
      title: 'CHAT',
  
      // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
      icons: {
        android: true,              // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        appleStartup: true,         // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        coast: true,                // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        favicons: true,             // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        firefox: true,              // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        windows: true,              // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        yandex: true                // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
      }
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
        test: /\.(png|jpg|gif|svg)$/,
        //exclude: /fav/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: addHash('file?name=[path][name].[ext]', 'hash:6'),
              //outputPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      // {
      //   test: /\.json/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //       }
      //     }
      //   ]
      // },
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