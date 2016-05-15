import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { persistStore } from 'redux-persist';
import { fromJS } from 'immutable';

import App from './App';
import storage from 'lib/storage';

class Root extends React.Component {

    static displayName = 'Root';

    static propTypes = {
        store: React.PropTypes.object.isRequired,
        locale: React.PropTypes.string.isRequired,
        messages: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = { rehydrated: false };
    }

    componentWillMount() {
        persistStore(this.props.store, {
            storage,
            deserialize: (serializedData) => fromJS(JSON.parse(serializedData)),
            transforms: [
                {
                    in: (state) => state,
                    out: (state, key) => {
                        if (key === 'tracks') {
                            return state.map((track) => track.set('isPlay', false));
                        }

                        return state;
                    }
                }
            ]
        }, () => {
            this.setState({ rehydrated: true });
        });
    }

    render() {
        if (!this.state.rehydrated) {
            return null;
        }

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
