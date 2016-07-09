const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const distPath = path.join(__dirname, 'dist');
const srcPath = path.join(__dirname, 'app');

module.exports = {
    context: srcPath,
    output: {
        path: distPath,
        filename: 'bundle.js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: [ '', '.js', '.styl' ],
        alias: {
            actions: path.join(srcPath, 'actions'),
            components: path.join(srcPath, 'components'),
            constants: path.join(srcPath, 'constants'),
            containers: path.join(srcPath, 'containers'),
            reducers: path.join(srcPath, 'reducers'),
            selectors: path.join(srcPath, 'selectors'),
            lib: path.join(srcPath, 'lib'),
            loc: path.join(srcPath, 'loc'),
            records: path.join(srcPath, 'records'),
            config: path.join(srcPath, 'config.js')
        },
        packageMains: [ 'webpack', 'browser', 'web', 'browserify', [ 'jam', 'main' ], 'main' ]
    },
    resolveLoader: {
        modulesDirectories: [ 'node_modules' ],
        moduleTemplates: [ '*-loader', '*' ],
        extensions: [ '', '.js' ]
    },
    module: {
        noParse: [
            /node_modules[\/\\]immutable[\/\\]dist[\/\\]immutable.js/
        ],
        loaders: [
            {
                test: /\.(woff2)$/,
                loader: 'file?name=fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
    ],
    postcss: function() {
        return [
            autoprefixer({
                browsers: [ 'last 2 Chrome versions' ]
            })
        ];
    },
    externals: [
        'glob',
        'musicmetadata',
        'node-localstorage',
        'md5'
    ]
};
