const path = require('path');
const webpack = require('webpack');

const testPath = path.join(__dirname, 'test');
const srcPath = path.join(__dirname, 'app');

module.exports = (config) => {
    config.set({
        frameworks: [ 'mocha', 'intl-shim', 'chai-immutable', 'sinon-chai' ],
        files: [
            'test/helpers/setup.js',
            'test/spec/**/*.js'
        ],
        preprocessors: {
            'test/**/*.js': [ 'electron', 'webpack' ]
        },
        webpack: {
            resolve: {
                extensions: [ '', '.js', '.styl' ],
                alias: {
                    actions: path.join(srcPath, 'actions'),
                    components: path.join(srcPath, 'components'),
                    constants: path.join(srcPath, 'constants'),
                    containers: path.join(srcPath, 'containers'),
                    reducers: path.join(srcPath, 'reducers'),
                    lib: path.join(srcPath, 'lib')
                }
            },
            plugins: [
                new webpack.DefinePlugin({
                    '__DEV__': true,
                    'process.env': {
                        'NODE_ENV': JSON.stringify('development')
                    }
                }),
                new webpack.ProvidePlugin({
                    React: 'react',
                    ReactDOM: 'react-dom'
                })
            ],
            module: {
                noParse: [
                    /node_modules[\/\\]immutable[\/\\]dist[\/\\]immutable.js/
                ],
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel',
                        include: [ srcPath, testPath ]
                    },
                    {
                        test: /\.styl$/,
                        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!stylus'
                    }
                ]
            },
            externals: {
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
            }
        },
        webpackMiddleware: {
            noInfo: true
        },
        reporters: [ 'progress' ],
        browsers: [ 'Electron' ],
        singleRun: true
    });
};
