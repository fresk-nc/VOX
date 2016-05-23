import IntlMessageFormat from 'intl-messageformat';
import messages from 'loc/messages';
import { showMessageBox } from 'lib/dialog';
import config from 'config';

const locale = config.defaultLocale;

export function reportError(src, callback) {
    const removeBtnId = 0;
    const cancelBtnId = 1;

    showMessageBox({
        type: 'error',
        buttons: [
            new IntlMessageFormat(messages[locale]['playerError.remove'], locale).format(),
            new IntlMessageFormat(messages[locale]['common.cancel'], locale).format()
        ],
        cancelId: cancelBtnId,
        message: new IntlMessageFormat(messages[locale]['playerError.message'], locale).format(),
        detail: new IntlMessageFormat(messages[locale]['playerError.detail'], locale).format({ src })
    }, (buttonIndex) => {
        if (buttonIndex === removeBtnId) {
            callback();
        }
    });
}
