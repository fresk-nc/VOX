import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { persistStore } from 'redux-persist';
import { fromJS, List } from 'immutable';

import PlaybackContainer from './PlaybackContainer';
import PlaybackBarContainer from './PlaybackBarContainer';
import PlaylistContainer from './PlaylistContainer';
import Loading from 'components/Loading';
import storage from 'lib/storage';
import Track from 'records/Track';
import Settings from 'records/Settings';

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
            blacklist: [ 'search' ],
            transforms: [
                {
                    in: (state) => state,
                    out: (state, key) => {
                        if (key === 'tracks') {
                            return List(
                                state.map((track) => {
                                    return new Track({
                                        ...track,
                                        isPlay: false,
                                        isSelected: false
                                    });
                                })
                            );
                        }

                        if (key === 'settings') {
                            return new Settings(state);
                        }

                        return fromJS(state);
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

    _renderContent() {
        if (!this.state.rehydrated) {
            return (
                <Loading />
            );
        }

        return (
            <div>
                <PlaybackContainer />
                <PlaybackBarContainer />
                <PlaylistContainer />
            </div>
        );
    }

    render() {
        const { store, locale, messages } = this.props;

        return (
            <Provider store={store}>
                <IntlProvider locale={locale} messages={messages}>
                    {this._renderContent()}
                </IntlProvider>
            </Provider>
        );
    }
}

export default DragDropContext(HTML5Backend)(Root);
