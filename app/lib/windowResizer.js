import config from 'config';

const { BrowserWindow } = require('electron').remote;

export default {
    expand() {
        this._resize(config.maxSize.width, config.maxSize.height);
    },

    collapse() {
        this._resize(config.minSize.width, config.minSize.height);
    },

    _resize(width, height) {
        BrowserWindow.getFocusedWindow().setSize(width, height);
    }
};
