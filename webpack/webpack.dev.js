const Webpack = require("webpack");
const WebpackMerge = require("webpack-merge");
const CommonConfig = require("./webpack.common");

module.exports = function(env) {
    CommonConfig[0] = WebpackMerge(CommonConfig[0], {
        entry: {
            app: [
                "webpack/hot/dev-server",
                "webpack-dev-server/client?http://localhost:8080/"
            ]
        },
        plugins: [
            new Webpack.HotModuleReplacementPlugin()
        ]
    });
    return CommonConfig;
}
