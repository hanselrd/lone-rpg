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
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
                /*use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })*/
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            }
        ]
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        //new ExtractTextPlugin('styles.css'),
        new HtmlWebpackPlugin({
            title: 'Lone RPG',
            hash: true
        })
    ]
}

const WebApp = Object.assign({}, AppConfig, {
    name: 'WebApp',
    output: {
        path: Path.resolve(__dirname, 'build/app'),
        filename: 'app.bundle.js',
        publicPath: '/'
    }
});

const DesktopApp = Object.assign({}, AppConfig, {
    name: 'DesktopApp',
    output: {
        path: Path.resolve(__dirname, 'build/desktop/app'),
        filename: 'app.bundle.js',
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
            filename: 'desktop.bundle.js',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader'
                }
            ]
        }
    }
]
