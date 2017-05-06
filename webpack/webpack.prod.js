const CommonConfig = require("./webpack.common");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const Webpack = require("webpack");
const WebpackMerge = require("webpack-merge");

module.exports = function(env) {
    for (let i = 0; i < 2; ++i) {
        CommonConfig[i] = WebpackMerge(CommonConfig[i], {
            plugins: [
                new Webpack.optimize.AggressiveMergingPlugin(),
                /*new CompressionWebpackPlugin({
                    asset: "[path].gz[query]",
                    algorithm: "gzip",
                    test: /\.(js|css|html)$/,
                    threshold: 10240,
                    minRatio: 0.8
                })*/
            ]
        });
    }
    return CommonConfig;
}
