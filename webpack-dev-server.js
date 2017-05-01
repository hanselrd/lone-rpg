const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(Webpack(config[0]), {
    hot: true,
    inline: true,
    contentBase: config[0].output.path
}).listen(8080, 'localhost', (err) => {
    if (err) console.log(err);
});
