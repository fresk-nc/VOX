import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import App from './App.js';

export default class Root extends React.Component {

    static displayName = 'Root';

    static propTypes = {
        store: React.PropTypes.object.isRequired,
        locale: React.PropTypes.string.isRequired,
        messages: React.PropTypes.object.isRequired
    };

    render() {
        const { store, locale, messages } = this.props;
        return (
            <Provider store={store}>
                <IntlProvider locale={locale} messages={messages}>
                    <App />
                </IntlProvider>
            </Provider>
        );
    }

}
