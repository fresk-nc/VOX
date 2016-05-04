import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import App from './App.js';

class Root extends React.Component {

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

export default DragDropContext(HTML5Backend)(Root);
