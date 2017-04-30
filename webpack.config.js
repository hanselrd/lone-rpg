const CleanWebpackPlugin = require('clean-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Path = require('path');
const Webpack = require('webpack');

const AppConfig = {
    entry: [
        './app/src/main.ts',
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080/'
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            p2: Path.resolve(__dirname, 'node_modules/phaser-ce/build/custom/p2.js'),
            pixi: Path.resolve(__dirname, 'node_modules/phaser-ce/build/custom/pixi.js'),
            phaser: Path.resolve(__dirname, 'node_modules/phaser-ce/build/custom/phaser-split.js')
        }
    },
    module: {
        rules: [
            { test: /\.tsx?$/, enforce: 'pre', loader: 'tslint-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /p2\.js/, use: ['expose-loader?p2'] },
            { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
            { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
            { test: /\.tsx?$/, use: ['ts-loader'] }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([
            Path.resolve(__dirname, 'build')
        ]),
        //new ExtractTextPlugin('styles.css'),
        new HtmlWebpackPlugin({
            title: 'Lone RPG',
            template: Path.resolve(__dirname, 'app/index.ejs')
        }),
        new Webpack.HotModuleReplacementPlugin()
    ]
}

const WebApp = Object.assign({}, AppConfig, {
    name: 'WebApp',
    output: {
        path: Path.resolve(__dirname, 'build/app'),
        filename: 'app.js',
        publicPath: '/'
    }
});

const DesktopApp = Object.assign({}, AppConfig, {
    name: 'DesktopApp',
    output: {
        path: Path.resolve(__dirname, 'build/desktop/app'),
        filename: 'app.js',
        publicPath: ''
    }
});

module.exports = [
    WebApp,
    DesktopApp,
    {
        entry: './desktop/src/main.ts',
        target: 'electron',
        node: {
            __dirname: false,
            __filename: false
        },
        output: {
            path: Path.resolve(__dirname, 'build/desktop'),
            filename: 'desktop.js',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                { test: /\.tsx?$/, enforce: 'pre', loader: 'tslint-loader' },
                { test: /\.tsx?$/, use: 'ts-loader' }
            ]
        }
    }
]
