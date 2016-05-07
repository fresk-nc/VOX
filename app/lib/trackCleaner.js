import { showMessageBox } from 'lib/dialog';

export function tryClean(callback) {
    const clearId = 0;
    const cancelId = 1;

    showMessageBox({
        buttons: [ 'Clear', 'Cancel' ],
        cancelId: cancelId,
        message: 'Are you sure you want to clear playlist?',
        detail: 'This operation can\'t be undone'
    }, (buttonIndex) => {
        if (buttonIndex === clearId) {
            callback();
        }
    });
}
