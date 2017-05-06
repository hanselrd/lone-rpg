const DevConfig = require("./webpack/webpack.dev");
const ProdConfig = require("./webpack/webpack.prod");

module.exports = function(env) {
    if (!env || env.dev) {
        return DevConfig(env);
    } else if (env.prod) {
        return ProdConfig(env);
    }
}
