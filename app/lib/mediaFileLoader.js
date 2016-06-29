import fs from 'fs';
import path from 'path';
import { flatten } from 'lodash';
import mediaDoctor from 'lib/mediaDoctor';
import config from 'config';

const glob = window.require('glob');
const mm = window.require('musicmetadata');

export function load(files) {
    return new Promise((resolve, reject) => {
        if (!files) {
            return resolve([]);
        }

        Promise.all(
            files.map((file) => {
                return getStats(file).then((stats) => {
                    if (stats.isDirectory()) {
                        return loadFolder(file);
                    }

                    if (stats.isFile()) {
                        return loadFile(file);
                    }
                });
            })
        )
            .then((res) => resolve(flatten(res)))
            .catch(reject);
    });
}

function getStats(file) {
    return new Promise((resolve, reject) => {
        fs.stat(file, (err, stats) => {
            if (err) {
                reject(err);
            } else {
                resolve(stats);
            }
        });
    });
}

function loadFolder(folder) {
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
        return Promise.all(files.map((file) => loadFile(file)));
    });
}

function loadFile(file) {
    return new Promise((resolve, reject) => {
        mm(
            fs.createReadStream(file),
            { duration: true },
            (err, metadata) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(mediaDoctor(file, metadata));
                }
            }
        );
    });
}
