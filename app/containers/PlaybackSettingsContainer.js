import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl } from 'react-intl';

import { toggleShuffle, changeLoopMode, changeVolume, updateInformer } from 'actions';
import player from 'lib/player.js';
import PlaybackSettings from 'components/PlaybackSettings';
import Settings from 'records/Settings';

const VOLUME_MIN = 0;
const VOLUME_MAX = 1;
const VOLUME_STEP = 0.05;
const DELAY_BEFORE_CHANGE_VOLUME = 100;

export class PlaybackSettingsContainer extends React.Component {

    static displayName = 'PlaybackSettingsContainer';

    static propTypes = {
        settings: React.PropTypes.instanceOf(Settings),
        intl: React.PropTypes.object.isRequired,

        toggleShuffle: React.PropTypes.func.isRequired,
        changeLoopMode: React.PropTypes.func.isRequired,
        changeVolume: React.PropTypes.func.isRequired,
        updateInformer: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this._timerId = null;
        this._clearTimer = this._clearTimer.bind(this);
        this._handleLoopClick = this._handleLoopClick.bind(this);
        this._handleShuffleClick = this._handleShuffleClick.bind(this);
        this._handleVolumePlusMouseDown = this._handleVolumePlusMouseDown.bind(this);
        this._handleVolumeMinusMouseDown = this._handleVolumeMinusMouseDown.bind(this);
        this._handleVolumeRangeInput = this._handleVolumeRangeInput.bind(this);
    }

    componentDidMount() {
        const { settings } = this.props;
        const isShuffle = settings.shuffle;
        const loopMode = settings.loopMode;
        const volume = settings.volume;

        player.changeLoopMode(loopMode);
        player.changeVolume(volume);

        if (isShuffle) {
            player.shuffleOn();
        }
    }

    _handleVolumeRangeInput(e) {
        this._changeVolume(Number(e.target.value));
    }

    _decrementVolume() {
        const { settings } = this.props;
        const newVolume = Math.max(settings.volume - VOLUME_STEP, VOLUME_MIN);

        this._changeVolume(newVolume);
    }

    _incrementVolume() {
        const { settings } = this.props;
        const newVolume = Math.min(settings.volume + VOLUME_STEP, VOLUME_MAX);

        this._changeVolume(newVolume);
    }

    _changeVolume(volume) {
        const { changeVolume, updateInformer, intl } = this.props;

        changeVolume(Number(volume.toFixed(2)));

        updateInformer(
            intl.formatMessage(
                { id: 'informer.volume' },
                { volume: Math.floor(volume * 100) }
            )
        );
    }

    _handleVolumeMinusMouseDown() {
        this._decrementVolume();

        this._timerId = setInterval(() => {
            this._decrementVolume();
        }, DELAY_BEFORE_CHANGE_VOLUME);
    }

    _handleVolumePlusMouseDown() {
        this._incrementVolume();

        this._timerId = setInterval(() => {
            this._incrementVolume();
        }, DELAY_BEFORE_CHANGE_VOLUME);
    }

    _clearTimer() {
        clearInterval(this._timerId);
    }

    _handleLoopClick() {
        const { settings, changeLoopMode, updateInformer, intl } = this.props;
        const currentLoopMode = settings.loopMode;
        let newLoopMode;
        let informMessage;

        switch (currentLoopMode) {
            case 'off':
                newLoopMode = 'all';
                informMessage = intl.formatMessage({ id: 'informer.repeatAll' });
                break;

            case 'all':
                newLoopMode = 'one';
                informMessage = intl.formatMessage({ id: 'informer.repeatOne' });
                break;

            case 'one':
                newLoopMode = 'off';
                informMessage = intl.formatMessage({ id: 'informer.repeatOff' });
                break;
        }

        changeLoopMode(newLoopMode);
        updateInformer(informMessage);
    }

    _handleShuffleClick() {
        const { settings, toggleShuffle, updateInformer, intl } = this.props;

        toggleShuffle(settings.shuffle);
        updateInformer(
            intl.formatMessage(
                { id: settings.shuffle ? 'informer.shuffleOff' : 'informer.shuffleOn' }
            )
        );
    }

    render() {
        const { settings } = this.props;

        return (
            <PlaybackSettings
                loopMode={settings.loopMode}
                isShuffle={settings.shuffle}
                volume={settings.volume}
                volumeMin={VOLUME_MIN}
                volumeMax={VOLUME_MAX}
                volumeStep={VOLUME_STEP}
                onLoopClick={this._handleLoopClick}
                onShuffleClick={this._handleShuffleClick}
                onVolumePlusMouseDown={this._handleVolumePlusMouseDown}
                onVolumePlusMouseUp={this._clearTimer}
                onVolumeMinusMouseDown={this._handleVolumeMinusMouseDown}
                onVolumeMinusMouseUp={this._clearTimer}
                onVolumeRangeInput={this._handleVolumeRangeInput}
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
        changeVolume,
        updateInformer
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(PlaybackSettingsContainer));
