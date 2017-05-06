const _ = require("lodash");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const Fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Path = require("path");
const Webpack = require("webpack");

const phaserModule = Path.resolve(__dirname, "../node_modules/phaser-ce");
const tetherModule = Path.resolve(__dirname, "../node_modules/tether");
const bootstrapModule = Path.resolve(__dirname, "../node_modules/bootstrap");

const nodeModules = {};
Fs.readdirSync("node_modules")
    .filter((x) => {
        return [".bin"].indexOf(x) === -1;
    })
    .forEach((mod) => {
        nodeModules[mod] = "commonjs " + mod;
    });

const App = {
    context: Path.resolve(__dirname, ".."),
    entry: {
        app: [
            "./app/src/main.ts"
        ],
        vendor: ["p2", "pixi", "phaser", "socketio", "jquery", "tethercss", "tetherjs", "bootstrapcss", "bootstrapjs"]
    },
    output: {
        filename: "js/app.min-[hash:6].js"
    },
    devtool: "cheap-source-map",
    resolve: {
        alias: {
            p2: Path.resolve(phaserModule, "build/custom/p2.js"),
            pixi: Path.resolve(phaserModule, "build/custom/pixi.js"),
            phaser: Path.resolve(phaserModule, "build/custom/phaser-split.js"),
            socketio: Path.resolve(__dirname, "../node_modules/socket.io-client/dist/socket.io.js"),
            jquery: Path.resolve(__dirname, "../node_modules/jquery/dist/jquery.js"),
            tethercss: Path.resolve(tetherModule, "dist/css/tether.css"),
            tetherjs: Path.resolve(tetherModule, "dist/js/tether.js"),
            bootstrapcss: Path.resolve(bootstrapModule, "dist/css/bootstrap.css"),
            bootstrapjs: Path.resolve(bootstrapModule, "dist/js/bootstrap.js")
        },
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, enforce: "pre", use: "tslint-loader" },
            { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
            { test: /\.css$/, use: ExtractTextWebpackPlugin.extract({ fallback: "style-loader", use: "css-loader" }) },
            { test: /p2\.js/, use: ["expose-loader?p2"] },
            { test: /pixi\.js/, use: ["expose-loader?PIXI"] },
            { test: /phaser-split\.js$/, use: ["expose-loader?Phaser"] },
            { test: /socket.io\.js$/, use: ["expose-loader?io"] },
            { test: /bootstrap\.js$/, use: ["imports-loader?$=jquery,jquery=jquery,jQuery=jquery,tether=tether,Tether=tether,this=>window"] },
            { test: /\.tsx?$/, use: ["ts-loader"] },
            { test: /assets(\/|\\)/, use: ["file-loader?name=assets/[hash].[ext]"] }
        ]
    }
}

const AppCleanWebpackPlugin = new CleanWebpackPlugin([
    "./build",
    "./docs"
], { root: Path.resolve(__dirname, "..") });
const AppCommonsChunkPlugin = new Webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    filename: "js/vendor.min-[hash:6].js",
    minChunks: Infinity
});
const AppExtractTextWebpackPlugin = new ExtractTextWebpackPlugin("css/vendor.min-[hash:6].css");
const AppHtmlWebpackPlugin = new HtmlWebpackPlugin({
    title: "Lone RPG",
    template: "./app/index.ejs"
});


const WebApp = _.merge({}, App, {
    name: "WebApp",
    output: {
        path: Path.resolve(__dirname, "../build/app"),
        publicPath: "/"
    },
    plugins: [
        AppCleanWebpackPlugin,
        AppCommonsChunkPlugin,
        AppExtractTextWebpackPlugin,
        AppHtmlWebpackPlugin
    ]
});

const DesktopApp = _.merge({}, App, {
    name: "DesktopApp",
    output: {
        path: Path.resolve(__dirname, "../build/desktop/app"),
        publicPath: ""
    },
    plugins: [
        AppCommonsChunkPlugin,
        AppExtractTextWebpackPlugin,
        AppHtmlWebpackPlugin
    ]
});

const Electron = {
    context: Path.resolve(__dirname, ".."),
    entry: "./desktop/src/main.ts",
    target: "electron",
    node: {
        __dirname: false,
        __filename: false
    },
    output: {
        path: Path.resolve(__dirname, "../build/desktop"),
        filename: "electron.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, enforce: "pre", use: "tslint-loader" },
            { test: /\.tsx?$/, use: "ts-loader" }
        ]
    }
}

const Server = {
    context: Path.resolve(__dirname, ".."),
    entry: "./server/src/main.ts",
    target: "node",
    node: {
        __dirname: false,
        __filename: false
    },
    output: {
        path: Path.resolve(__dirname, "../build"),
        filename: "server.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    externals: nodeModules,
    module: {
        rules: [
            { test: /\.tsx?$/, enforce: "pre", use: "tslint-loader" },
            { test: /\.tsx?$/, use: "ts-loader" }
        ]
    }
}

module.exports = [
    WebApp,
    DesktopApp,
    Electron,
    Server
]
