'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

const distPath = path.join(__dirname, 'dist');
const srcPath = path.join(__dirname, 'app');
const baseConfig = require('./webpack.config.base');
const config = Object.create(baseConfig);

config.devtool = 'source-map';

config.entry = 'index.js';

config.output.publicPath = distPath;

config.module.loaders.push({
    test: /\.js$/,
    loaders: [ 'babel' ],
    include: [ srcPath ]
}, {
    test: /\.styl$/,
    loader: ExtractTextPlugin.extract(
        'style',
        'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!stylus'
    )
});

config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
        '__DEV__': false,
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new ExtractTextPlugin('style.css', {
        allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
        compressor: {
            screw_ie8: true,
            warnings: false
        }
    })
);

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
