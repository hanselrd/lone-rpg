const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const Config = require("../webpack.config")({ dev: true });

new WebpackDevServer(Webpack(Config[0]), {
    hot: true,
    inline: true,
    contentBase: Config[0].output.path
}).listen(8080, "localhost", (err) => {
    if (err) console.log(err);
});
