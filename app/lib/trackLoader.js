import path from 'path';

import { showOpenDialog } from 'lib/dialog.js';
import { load } from 'lib/mediaFileLoader.js';

export function loadFromDialog() {
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
        }, (files) => {
            load(files).then(resolve).catch(reject);
        });
    });
}

export function loadFromDrop(files) {
    const audioFiles = files.filter((f) => {
        const extName = path.extname(f);

        return !extName || extName === '.mp3';
    });

    return load(audioFiles);
}
