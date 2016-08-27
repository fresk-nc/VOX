/* eslint-disable no-console */
'use strict';

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.prod.js');
const packager = require('electron-packager');
const del = require('del');
const pkg = require('./package.json');
const argv = require('minimist')(process.argv.slice(2));

const deps = Object.keys(pkg.dependencies);
const devDeps = Object.keys(pkg.devDependencies);

const opts = {
    dir: './',
    name: pkg.productName,
    platform: argv.platform || [ 'darwin', 'win32', 'linux' ],
    arch: argv.arch || 'all',
    ignore: getIgnore(),
    version: pkg.devDependencies['electron-prebuilt'],
    prune: true,
    'app-version': pkg.version,
    'build-version': pkg.version,
    out: 'release',
    icon: './app/images/logo/app'
};

startPack();

function getIgnore() {
    return [
        '^/scripts($|/)',
        '^/state($|/)',
        '^/release($|/)',
        '^/test($|/)'
    ]
        .concat(devDeps.map((name) => `/node_modules/${name}($|/)`))
        .concat(
            deps
                .filter((name) => webpackConfig.externals.indexOf(name) === -1)
                .map((name) => `/node_modules/${name}($|/)`)
        );
}

function startPack() {
    console.log('start pack...');

    build()
        .then(() => del('release'))
        .then(() => packager(opts, (err) => {
            if (err) {
                throw err;
            }
        }))
        .catch((err) => console.error(err));
}

function build() {
    return new Promise((resolve, reject) => {
        webpack(webpackConfig, (err, stats) => {
            if (err) {
                reject(err);
            } else {
                resolve(stats);
            }
        });
    });
}
