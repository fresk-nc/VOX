const { dialog } = require('electron').remote;

const DISABLED_CLASS = 'disabled';

export function showMessageBox(options, callback) {
    beforeShow();

    dialog.showMessageBox(options, function() {
        afterClose();
        callback(...arguments);
    });
}

export function showOpenDialog(options, callback) {
    beforeShow();

    dialog.showOpenDialog(options, function() {
        afterClose();
        callback(...arguments);
    });
}

function beforeShow() {
    document.body.classList.add(DISABLED_CLASS);
}

function afterClose() {
    document.body.classList.remove(DISABLED_CLASS);
}
