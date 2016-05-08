import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import { toggleShuffle, changeLoopMode } from 'actions';
import player from 'lib/player.js';
import PlaybackSettings from 'components/PlaybackSettings';

class PlaybackSettingsContainer extends React.Component {

    static displayName = 'PlaybackSettingsContainer';

    static propTypes = {
        settings: React.PropTypes.instanceOf(Map),

        toggleShuffle: React.PropTypes.func.isRequired,
        changeLoopMode: React.PropTypes.func.isRequired
    };

    componentDidMount() {
        const { settings } = this.props;
        const isShuffle = settings.get('shuffle');
        const loopMode = settings.get('loopMode');

        player.changeLoopMode(loopMode);

        if (isShuffle) {
            player.shuffleOn();
        }
    }

    _changeLoopMode() {
        const { settings, changeLoopMode } = this.props;
        const currentLoopMode = settings.get('loopMode');
        let newLoopMode;

        switch (currentLoopMode) {
            case 'off':
                newLoopMode = 'all';
                break;

            case 'all':
                newLoopMode = 'one';
                break;

            case 'one':
                newLoopMode = 'off';
                break;
        }

        changeLoopMode(newLoopMode);
    }

    render() {
        const { settings, toggleShuffle } = this.props;

        return (
            <PlaybackSettings
                loopMode={settings.get('loopMode')}
                isShuffle={settings.get('shuffle')}
                onLoopClicked={() => this._changeLoopMode()}
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
        toggleShuffle,
        changeLoopMode
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaybackSettingsContainer);
