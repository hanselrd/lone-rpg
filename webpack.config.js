const CleanWebpackPlugin = require("clean-webpack-plugin");
const Fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Path = require("path");
const Webpack = require("webpack");

const phaserModule = Path.resolve(__dirname, "node_modules/phaser-ce");
const tetherModule = Path.resolve(__dirname, "node_modules/tether");
const bootstrapModule = Path.resolve(__dirname, "node_modules/bootstrap");

const nodeModules = {};
Fs.readdirSync("node_modules")
    .filter((x) => {
        return [".bin"].indexOf(x) === -1;
    })
    .forEach((mod) => {
        nodeModules[mod] = "commonjs " + mod;
    });


const App = {
    devtool: "cheap-source-map",
    resolve: {
        alias: {
            p2: Path.resolve(phaserModule, "build/custom/p2.js"),
            pixi: Path.resolve(phaserModule, "build/custom/pixi.js"),
            phaser: Path.resolve(phaserModule, "build/custom/phaser-split.js"),
            socketio: Path.resolve(__dirname, "node_modules/socket.io-client/dist/socket.io.js"),
            jquery: Path.resolve(__dirname, "node_modules/jquery/dist/jquery.js"),
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
            { test: /\.css$/, use: ["style-loader", "css-loader"]},
            { test: /p2\.js/, use: ["expose-loader?p2"] },
            { test: /pixi\.js/, use: ["expose-loader?PIXI"] },
            { test: /phaser-split\.js$/, use: ["expose-loader?Phaser"] },
            { test: /socket.io\.js$/, use: ["expose-loader?io"] },
            { test: /\.tsx?$/, use: ["ts-loader"] },
            { test: /assets(\/|\\)/, use: ["file-loader?name=assets/[hash].[ext]"] }
        ]
    }
}

const WebApp = Object.assign({}, App, {
    name: "WebApp",
    entry: {
        app: [
            Path.resolve(__dirname, "app/src/main.ts"),
            "webpack/hot/dev-server",
            "webpack-dev-server/client?http://localhost:8080/"
        ],
        vendor: ["p2", "pixi", "phaser", "socketio", "jquery", "tethercss", "tetherjs", "bootstrapcss", "bootstrapjs"]
    },
    output: {
        path: Path.resolve(__dirname, "build/app"),
        filename: "js/app.min-[hash:6].js",
        publicPath: "/"
    },
    plugins: [
        new CleanWebpackPlugin([
            Path.resolve(__dirname, "build"),
            Path.resolve(__dirname, "docs")
        ]),
        new Webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jquery",
            jQuery: "jquery",
            tether: "tether",
            Tether: "tether"
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "js/vendor.min-[hash:6].js",
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: "Lone RPG",
            template: Path.resolve(__dirname, "app/index.ejs")
        }),
        new Webpack.HotModuleReplacementPlugin()
    ]
});

const DesktopApp = Object.assign({}, App, {
    name: "DesktopApp",
    entry: {
        app: [
            Path.resolve(__dirname, "app/src/main.ts")
        ],
        vendor: ["p2", "pixi", "phaser", "socketio", "jquery", "tethercss", "tetherjs", "bootstrapcss", "bootstrapjs"]
    },
    output: {
        path: Path.resolve(__dirname, "build/desktop/app"),
        filename: "js/app.min-[hash:6].js",
        publicPath: ""
    },
    plugins: [
        new CleanWebpackPlugin([
            Path.resolve(__dirname, "build"),
            Path.resolve(__dirname, "docs")
        ]),
        new Webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "js/vendor.min-[hash:6].js",
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: "Lone RPG",
            template: Path.resolve(__dirname, "app/index.ejs")
        })
    ]
});

const Electron = {
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
}

const Server = {
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

module.exports = function(env) {
    if (env.buildWebAppOnly) {
        return WebApp;
    } else if (env.buildDesktopAppOnly) {
        return DesktopApp;
    } else if (env.buildElectronOnly) {
        return Electron;
    } else if (env.buildServerOnly) {
        return Server;
    } else {
        return [
            WebApp,
            DesktopApp,
            Electron,
            Server
        ]
    }
}
