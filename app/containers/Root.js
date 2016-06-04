import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { persistStore } from 'redux-persist';
import { fromJS } from 'immutable';

import PlaybackContainer from './PlaybackContainer.js';
import PlaybackBarContainer from './PlaybackBarContainer.js';
import Playlist from './Playlist.js';
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

    componentDidMount() {
        document.addEventListener('dragover', (event) => {
            event.preventDefault();
            return false;
        }, false);

        document.addEventListener('drop', (event) => {
            event.preventDefault();
            return false;
        }, false);
    }

    render() {
        if (!this.state.rehydrated) {
            return null;
        }

        const { store, locale, messages } = this.props;

        return (
            <Provider store={store}>
                <IntlProvider locale={locale} messages={messages}>
                    <div>
                        <PlaybackContainer />
                        <PlaybackBarContainer />
                        <Playlist />
                    </div>
                </IntlProvider>
            </Provider>
        );
    }

}

export default DragDropContext(HTML5Backend)(Root);
