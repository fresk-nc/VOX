const { BrowserWindow } = require('electron').remote;

export default {
    nextTrack(track) {
        if (!track) {
            return;
        }

        if (this._hasFocusedWindow()) {
            return;
        }

        this._showNotification(track.title, {
            body: `${track.artist} — ${track.album}`
        });
    },

    _hasFocusedWindow() {
        return Boolean(BrowserWindow.getFocusedWindow());
    },

    _showNotification(title, options) {
        new Notification(title, options);
    }
};
