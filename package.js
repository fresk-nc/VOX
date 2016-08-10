/* eslint-disable no-console */
'use strict';

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.prod.js');
const packager = require('electron-packager');
const del = require('del');
const pkg = require('./package.json');

const deps = Object.keys(pkg.dependencies);
const devDeps = Object.keys(pkg.devDependencies);
const appName = pkg.productName;

const opts = {
    dir: './',
    platform: 'darwin',
    arch: 'x64',
    name: appName,
    asar: false,
    ignore: getIgnore(),
    version: '1.3.2',
    prune: true,
    'app-version': pkg.version,
    out: 'release/darwin-x64',
    icon: 'app/app.icns'
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
        .then(() => packager(opts, log('darwin', 'x64')))
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

function log(plat, arch) {
    return (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`${plat}-${arch} finished!`);
        }
    };
}
