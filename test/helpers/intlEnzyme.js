import { IntlProvider, intlShape } from 'react-intl';
import { mount, shallow } from 'enzyme';
import messages from 'loc/messages';

const intlProvider = new IntlProvider({ locale: 'en', messages: messages.en }, {});
const { intl } = intlProvider.getChildContext();

function nodeWithIntlProp(node) {
    return React.cloneElement(node, { intl });
}

export function shallowWithIntl(node) {
    return shallow(nodeWithIntlProp(node), {
        context: { intl }
    });
}

export function mountWithIntl(node) {
    return mount(nodeWithIntlProp(node), {
        context: { intl },
        childContextTypes: { intl: intlShape }
    });
}
