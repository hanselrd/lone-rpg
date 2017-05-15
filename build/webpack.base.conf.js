var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var phaserModule = resolve("node_modules/phaser-ce/build/custom")
var phaser = path.join(phaserModule, 'phaser-split.js')
var pixi = path.join(phaserModule, 'pixi.js')
var p2 = path.join(phaserModule, 'p2.js')

module.exports = {
  entry: {
    app: './src/main.ts'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2
    }
  },
  module: {
    rules: [
      {
        test: /phaser-split\.js/,
        loader: 'expose-loader?Phaser'
      },
      {
        test: /pixi\.js/,
        loader: 'expose-loader?PIXI'
      },
      {
        test: /p2\.js/,
        loader: 'expose-loader?p2'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.(tsx?|vue)$/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: [resolve('src'), resolve('test')],
        exclude: [
          resolve('node_modules'),
          //resolve('typings')
        ],
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
