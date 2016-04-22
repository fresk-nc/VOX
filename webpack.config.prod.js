import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import baseConfig from './webpack.config.base';

const distPath = path.join(__dirname, 'dist');
const srcPath = path.join(__dirname, 'app');

export default {
    ...baseConfig,

    devtool: 'source-map',
    entry: './index.js',
    module: {
        ...baseConfig.module,

        loaders: [
            ...baseConfig.module.loaders,

            {
                test: /\.js$/,
                loaders: [ 'babel' ],
                include: [ srcPath ]
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!stylus'
                )
            }
        ]
    },
    plugins: [
        ...baseConfig.plugins,

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
    ],
    target: 'electron-renderer'
};
