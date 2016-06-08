var path = require("path");

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
        sources.push('webpack/hot/only-dev-server');
    }

    return sources;
}

module.exports = {
    devServer: {
        headers: { "Access-Control-Allow-Origin": "localhost:*" }
    },
    entry: {
        app: getEntrySources([
            './js/app.js'
        ])
    },
    output: {
        publicPath: 'http://localhost:8080/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.css$/, loaders: ['style', 'css'] }
        ]
    },
};
