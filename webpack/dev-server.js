const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const Config = require("../webpack.config")({ buildWebAppOnly: true });

new WebpackDevServer(Webpack(Config), {
    hot: true,
    inline: true,
    contentBase: Config.output.path
}).listen(8080, "localhost", (err) => {
    if (err) console.log(err);
});
