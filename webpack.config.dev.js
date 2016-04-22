import path from 'path';
import webpack from 'webpack';

import baseConfig from './webpack.config.base';

const srcPath = path.join(__dirname, 'app');

export default {
    ...baseConfig,

    debug: true,
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
        './index.js'
    ],
    output: {
        ...baseConfig.output,

        publicPath: 'http://localhost:3000/dist/'
    },
    module: {
        ...baseConfig.module,

        loaders: [
            ...baseConfig.module.loaders,

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
        ...baseConfig.plugins,

        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            '__DEV__': true,
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ],
    target: 'electron-renderer'
};
