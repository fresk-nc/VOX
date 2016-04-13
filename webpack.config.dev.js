'use strict';

const path = require('path');
const webpack = require('webpack');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

const srcPath = path.join(__dirname, 'app');
const baseConfig = require('./webpack.config.base');
const config = Object.create(baseConfig);

config.debug = true;

config.devtool = 'cheap-module-eval-source-map';

config.entry = [
    'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
    './index.js'
];

config.output.publicPath = 'http://localhost:3000/dist/';

config.module.loaders.push({
    test: /\.js$/,
    loaders: [ 'react-hot', 'babel' ],
    include: [ srcPath ]
}, {
    test: /\.styl$/,
    loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!stylus'
});

config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        '__DEV__': true,
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    })
);

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
