import coverLoader from 'lib/coverLoader';

const { BrowserWindow } = require('electron').remote;

export default {
    nextTrack(track) {
        if (!track) {
            return;
        }

        if (this._hasFocusedWindow()) {
            return;
        }

        coverLoader.load(track.src).then((cover) => {
            this._showNotification(track.title, {
                body: `${track.artist} — ${track.album}`,
                icon: cover,
                silent: true
            });
        });
    },

    _hasFocusedWindow() {
        return Boolean(BrowserWindow.getFocusedWindow());
    },

    _showNotification(title, options) {
        new Notification(title, options);
    }
};
