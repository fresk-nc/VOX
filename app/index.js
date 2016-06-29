import Root from 'containers/Root';
import configureStore from './store/configureStore';
import messages from 'loc/messages';
import './styles/index.styl';
import config from 'config';

if (process.env.NODE_ENV === 'development') {
    window.ReactPerf = require('react-addons-perf');
}

require('moment-duration-format');

const store = configureStore();
const locale = config.defaultLocale;

ReactDOM.render(
    <Root store={store} locale={locale} messages={messages[locale]} />,
    document.getElementById('root')
);
