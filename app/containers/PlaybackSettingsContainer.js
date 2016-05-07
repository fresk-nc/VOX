import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import { toggleShuffle } from 'actions';
import player from 'lib/player.js';
import PlaybackSettings from 'components/PlaybackSettings';

class PlaybackSettingsContainer extends React.Component {

    static displayName = 'PlaybackSettingsContainer';

    static propTypes = {
        settings: React.PropTypes.instanceOf(Map),

        toggleShuffle: React.PropTypes.func.isRequired
    };

    componentDidMount() {
        const { settings } = this.props;
        const isShuffle = settings.get('shuffle');

        if (isShuffle) {
            player.shuffleOn();
        }
    }

    render() {
        const { settings, toggleShuffle } = this.props;

        return (
            <PlaybackSettings
                isShuffle={settings.get('shuffle')}
                onShuffleClicked={() => toggleShuffle(settings.get('shuffle'))}
            />
        );
    }

}

function mapStateToProps(state) {
    return { settings: state.settings };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        toggleShuffle
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaybackSettingsContainer);
