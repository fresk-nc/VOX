import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { persistStore } from 'redux-persist';
import { List } from 'immutable';

import { rehydrateSuccess } from 'actions';
import PlaybackContainer from './PlaybackContainer';
import PlaybackBarContainer from './PlaybackBarContainer';
import PlaylistContainer from './PlaylistContainer';
import Loading from 'components/Loading';
import storage from 'lib/storage';
import Track from 'records/Track';
import Settings from 'records/Settings';
import Status from 'records/Status';

export class App extends React.Component {

    static displayName = 'App';

    static propTypes = {
        status: React.PropTypes.instanceOf(Status).isRequired,

        rehydrateSuccess: React.PropTypes.func.isRequired
    };

    static contextTypes = {
        store: React.PropTypes.object
    };

    componentDidMount() {
        persistStore(this.context.store, {
            storage,
            blacklist: [ 'search', 'status' ],
            transforms: [
                {
                    in: (state) => state,
                    out: this._transformOutPersistedState
                }
            ]
        }, this.props.rehydrateSuccess);
    }

    _transformOutPersistedState(state, key) {
        if (key === 'tracks') {
            return List(
                state.map((track) => {
                    return new Track({
                        ...track,
                        isPlay: false,
                        isSelected: false,
                        rootOfSelection: false
                    });
                })
            );
        }

        if (key === 'settings') {
            return new Settings(state);
        }
    }

    render() {
        const { status } = this.props;

        if (!status.rehydrated) {
            return (
                <div>
                    <Loading />
                </div>
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
}

function mapStateToProps(state) {
    return {
        status: state.status
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        rehydrateSuccess
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
