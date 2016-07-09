import fs from 'fs';
import path from 'path';
import _ from 'lodash';

import mediaDoctor from 'lib/mediaDoctor';
import config from 'config';

const md5 = window.require('md5');
const glob = window.require('glob');
const mm = window.require('musicmetadata');

export default {
    _cache: {},

    /**
     * @param {Array} files
     * @returns {Promise}
     */
    load(files) {
        return new Promise((resolve, reject) => {
            if (!files) {
                return resolve([]);
            }

            Promise.all(
                files.map((file) => {
                    return this._getStats(file).then((stats) => {
                        if (stats.isDirectory()) {
                            return this.loadFolder(file);
                        }

                        if (stats.isFile()) {
                            return this.loadFile(file);
                        }
                    });
                })
            )
                .then((res) => resolve(_.flatten(res)))
                .catch(reject);
        });
    },

    /**
     * @param {string} file
     * @returns {Promise}
     */
    _getStats(file) {
        return new Promise((resolve, reject) => {
            fs.stat(file, (err, stats) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(stats);
                }
            });
        });
    },

    /**
     * @param {string} folder
     * @returns {Promise}
     */
    loadFolder(folder) {
        return new Promise((resolve, reject) => {
            const pattern = `**/*.{${config.formats.join(',')}}`;

            glob(pattern, { cwd: folder }, (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(files.map((file) => path.join(folder, file)));
                }
            });
        }).then((files) => {
            return Promise.all(files.map((file) => this.loadFile(file)));
        });
    },

    /**
     * @param {string} file
     * @returns {Promise}
     */
    loadFile(file) {
        return new Promise((resolve, reject) => {
            const hash = md5(file);

            if (this._cache[hash]) {
                return resolve(this._cache[hash]);
            }

            mm(
                fs.createReadStream(file),
                { duration: true },
                (err, metadata) => {
                    if (err) {
                        reject(err);
                    } else {
                        this._cache[hash] = mediaDoctor(file, metadata);

                        resolve(this._cache[hash]);
                    }
                }
            );
        });
    }
};
