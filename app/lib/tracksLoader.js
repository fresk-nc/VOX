import { showOpenDialog } from 'lib/dialog.js';
import fs from 'fs';
import mm from 'musicmetadata';

export function load() {
    return new Promise((resolve, reject) => {
        showOpenDialog({
            properties: [
                'openFile',
                'openDirectory',
                'multiSelections'
            ],
            filters: [
                {
                    name: 'Audio',
                    extensions: [ 'mp3' ]
                }
            ]
        }, (filenames) => {
            if (!filenames) {
                return resolve([]);
            }

            Promise.all(
                filenames.map((filename) => {
                    return getMetadata(filename);
                })
            )
                .then(resolve)
                .catch(reject);
        });
    });
}

function getMetadata(filename) {
    return new Promise((resolve, reject) => {
        mm(
            fs.createReadStream(filename),
            { duration: true },
            (err, metadata) => {
                if (err) {
                    reject(err);
                }

                resolve(normalize(filename, metadata));
            }
        );
    });
}

function normalize(filename, metadata) {
    return {
        id: Date.now(),
        src: filename,
        artist: metadata.artist[0],
        title: metadata.title,
        duration: metadata.duration,
        isPlay: false,
        isCurrent: false
    };
}
