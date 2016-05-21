import IntlMessageFormat from 'intl-messageformat';
import messages from '../loc/messages';
import { showMessageBox } from 'lib/dialog';
import config from 'config';

const locale = config.defaultLocale;

export function tryClean(callback) {
    const clearId = 0;
    const cancelId = 1;

    showMessageBox({
        buttons: [
            new IntlMessageFormat(messages[locale]['trackCleaner.clear'], locale).format(),
            new IntlMessageFormat(messages[locale]['common.cancel'], locale).format()
        ],
        cancelId: cancelId,
        message: new IntlMessageFormat(messages[locale]['trackCleaner.message'], locale).format(),
        detail: new IntlMessageFormat(messages[locale]['trackCleaner.detail'], locale).format()
    }, (buttonIndex) => {
        if (buttonIndex === clearId) {
            callback();
        }
    });
}
