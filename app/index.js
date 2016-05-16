import Root from 'containers/Root';
import configureStore from './store/configureStore';
import config from './config';
import messages from './loc/messages';
import './styles/index.styl';

require('moment-duration-format');

const store = configureStore();
const locale = config.defaultLocale;

ReactDOM.render(
    <Root store={store} locale={locale} messages={messages[locale]} />,
    document.getElementById('root')
);
