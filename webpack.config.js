const CleanWebpackPlugin = require('clean-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Path = require('path');
const Webpack = require('webpack');

let nodeModules = {};
Fs.readdirSync('node_modules')
    .filter((x) => {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach((mod) => {
        nodeModules[mod] = 'commonjs ' + mod;
    });


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
            phaser: Path.resolve(__dirname, 'node_modules/phaser-ce/build/custom/phaser-split.js'),
            socketio: Path.resolve(__dirname, 'node_modules/socket.io-client/dist/socket.io.js')
        }
    },
    module: {
        rules: [
            { test: /\.tsx?$/, enforce: 'pre', loader: 'tslint-loader' },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /p2\.js/, use: ['expose-loader?p2'] },
            { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
            { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
            { test: /socket.io\.js$/, use: ['expose-loader?io'] },
            { test: /\.tsx?$/, use: ['ts-loader'] },
            { test: /assets(\/|\\)/, use: ['file-loader?name=assets/[hash].[ext]'] }
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
        new Webpack.HotModuleReplacementPlugin(),
        //new Webpack.NoErrorsPlugin()
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
            filename: 'electron.js',
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
    },
    {
        entry: './server/src/main.ts',
        target: 'node',
        node: {
            __dirname: false,
            __filename: false
        },
        output: {
            path: Path.resolve(__dirname, 'build'),
            filename: 'server.js',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        externals: nodeModules,
        module: {
            rules: [
                { test: /\.tsx?$/, enforce: 'pre', loader: 'tslint-loader' },
                { test: /\.tsx?$/, use: 'ts-loader' }
            ]
        }
    }
]
