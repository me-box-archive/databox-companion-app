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
        headers: { "Access-Control-Allow-Origin": "localhost:*" },
        historyApiFallback: true 
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
            { test: /\.js$/, loaders: ['react-hot', 'babel-polyfill'], exclude: /node_modules/ },
            { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
            { test: /\.css$/, loaders: ['style', 'css'] },
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192&name=./img/[name].[ext]'},
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff/[name].[ext]&name=./img/[name].[ext]" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?limit=8192&name=./img/[name].[ext]" },
        ]
    },
};
