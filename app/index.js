import Root from 'containers/Root';
import configureStore from './store/configureStore';
import { messages } from './loc/en';
import './styles/index.styl';

require('moment-duration-format');

const store = configureStore();
const locale = 'en';

ReactDOM.render(
    <Root store={store} locale={locale} messages={messages} />,
    document.getElementById('root')
);
