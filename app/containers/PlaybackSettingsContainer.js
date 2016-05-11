import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import { toggleShuffle, changeLoopMode, changeVolume } from 'actions';
import player from 'lib/player.js';
import PlaybackSettings from 'components/PlaybackSettings';

const VOLUME_MIN = 0;
const VOLUME_MAX = 1;
const VOLUME_STEP = 0.05;
const DELAY_BEFORE_CHANGE_VOLUME = 100;

class PlaybackSettingsContainer extends React.Component {

    static displayName = 'PlaybackSettingsContainer';

    static propTypes = {
        settings: React.PropTypes.instanceOf(Map),

        toggleShuffle: React.PropTypes.func.isRequired,
        changeLoopMode: React.PropTypes.func.isRequired,
        changeVolume: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this._timerId = null;
    }

    componentDidMount() {
        const { settings } = this.props;
        const isShuffle = settings.get('shuffle');
        const loopMode = settings.get('loopMode');
        const volume = settings.get('volume');

        player.changeLoopMode(loopMode);
        player.changeVolume(volume);

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

    _onVolumeRangeInput(e) {
        const { changeVolume } = this.props;

        changeVolume(Number(e.target.value));
    }

    _decrementVolume() {
        const { settings, changeVolume } = this.props;
        const newVolume = Math.max(settings.get('volume') - VOLUME_STEP, VOLUME_MIN);

        changeVolume(newVolume);
    }

    _incrementVolume() {
        const { settings, changeVolume } = this.props;
        const newVolume = Math.min(settings.get('volume') + VOLUME_STEP, VOLUME_MAX);

        changeVolume(newVolume);
    }

    _onVolumeMinusMouseDown() {
        this._decrementVolume();

        this._timerId = setInterval(() => {
            this._decrementVolume();
        }, DELAY_BEFORE_CHANGE_VOLUME);
    }

    _onVolumePlusMouseDown() {
        this._incrementVolume();

        this._timerId = setInterval(() => {
            this._incrementVolume();
        }, DELAY_BEFORE_CHANGE_VOLUME);
    }

    _clearTimer() {
        clearInterval(this._timerId);
    }

    render() {
        const { settings, toggleShuffle } = this.props;

        return (
            <PlaybackSettings
                loopMode={settings.get('loopMode')}
                isShuffle={settings.get('shuffle')}
                volume={settings.get('volume')}
                volumeMin={VOLUME_MIN}
                volumeMax={VOLUME_MAX}
                volumeStep={VOLUME_STEP}
                onLoopClicked={() => this._changeLoopMode()}
                onShuffleClicked={() => toggleShuffle(settings.get('shuffle'))}
                onVolumePlusMouseDown={() => this._onVolumePlusMouseDown()}
                onVolumePlusMouseUp={() => this._clearTimer()}
                onVolumeMinusMouseDown={() => this._onVolumeMinusMouseDown()}
                onVolumeMinusMouseUp={() => this._clearTimer()}
                onVolumeRangeInput={(e) => this._onVolumeRangeInput(e)}
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
        changeLoopMode,
        changeVolume
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaybackSettingsContainer);
