const CleanWebpackPlugin = require("clean-webpack-plugin");
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Path = require("path");
const Webpack = require("webpack");

const phaserModule = Path.resolve(__dirname, "node_modules/phaser-ce");

const nodeModules = {};
Fs.readdirSync("node_modules")
    .filter((x) => {
        return [".bin"].indexOf(x) === -1;
    })
    .forEach((mod) => {
        nodeModules[mod] = "commonjs " + mod;
    });


const AppConfig = {
    entry: {
        app: [
            Path.resolve(__dirname, "app/src/main.ts"),
            "webpack/hot/dev-server",
            "webpack-dev-server/client?http://localhost:8080/"
        ],
        vendor: ["p2", "pixi", "phaser", "socketio"]
    },
    devtool: "cheap-source-map",
    resolve: {
        alias: {
            p2: Path.resolve(phaserModule, "build/custom/p2.js"),
            pixi: Path.resolve(phaserModule, "build/custom/pixi.js"),
            phaser: Path.resolve(phaserModule, "build/custom/phaser-split.js"),
            socketio: Path.resolve(__dirname, "node_modules/socket.io-client/dist/socket.io.js")
        },
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, enforce: "pre", use: "tslint-loader" },
            { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
            { test: /p2\.js/, use: ["expose-loader?p2"] },
            { test: /pixi\.js/, use: ["expose-loader?PIXI"] },
            { test: /phaser-split\.js$/, use: ["expose-loader?Phaser"] },
            { test: /socket.io\.js$/, use: ["expose-loader?io"] },
            { test: /\.tsx?$/, use: ["ts-loader"] },
            { test: /assets(\/|\\)/, use: ["file-loader?name=assets/[hash].[ext]"] }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([
            Path.resolve(__dirname, "build")
        ]),
        new Webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "js/vendor.min-[hash:6].js",
            minChunks: Infinity
        }),
        //new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            title: "Lone RPG",
            template: Path.resolve(__dirname, "app/index.ejs")
        }),
        //new Webpack.NoErrorsPlugin(),
        new Webpack.HotModuleReplacementPlugin()
    ]
};

const WebApp = Object.assign({}, AppConfig, {
    name: "WebApp",
    output: {
        path: Path.resolve(__dirname, "build/app"),
        filename: "js/app.min-[hash:6].js",
        publicPath: "/"
    }
});

const DesktopApp = Object.assign({}, AppConfig, {
    name: "DesktopApp",
    output: {
        path: Path.resolve(__dirname, "build/desktop/app"),
        filename: "js/app.min-[hash:6].js",
        publicPath: ""
    }
});

module.exports = [
    WebApp,
    DesktopApp,
    {
        entry: Path.resolve(__dirname, "desktop/src/main.ts"),
        target: "electron",
        node: {
            __dirname: false,
            __filename: false
        },
        output: {
            path: Path.resolve(__dirname, "build/desktop"),
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
    },
    {
        entry: Path.resolve(__dirname, "server/src/main.ts"),
        target: "node",
        node: {
            __dirname: false,
            __filename: false
        },
        output: {
            path: Path.resolve(__dirname, "build"),
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
]
