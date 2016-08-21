var autoprefixer = require('autoprefixer');
var path = require('path');
var precss = require('precss');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    cache: true,
    context: path.join(__dirname, 'client'),
    entry: './js/main.js',
    output: {
        path: path.join(__dirname, 'build/js-dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
            }
        ]
    },
    postcss: function () {
        return [precss, autoprefixer];
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        // Optimize
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('styles.css', {
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                // Signal production mode for React JS libs.
                NODE_ENV: JSON.stringify('production')
            }
        }),
        // Manually do source maps to use alternate host.
        new webpack.SourceMapDevToolPlugin(
            'bundle.js.map',
            '\n//# sourceMappingURL=http://127.0.0.1:3001/build/js-dist/[url]')
    ]
};
