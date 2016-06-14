/* eslint-disable max-len */

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');
const srcPath = path.join(__dirname, 'app');

module.exports = webpackMerge(baseConfig, {
    debug: true,
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
        './index.js'
    ],
    output: {
        publicPath: 'http://localhost:3000/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [ 'react-hot', 'babel' ],
                include: [ srcPath ]
            },
            {
                test: /\.styl$/,
                loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!stylus'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            '__DEV__': true,
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ],
    target: 'electron-renderer'
});
