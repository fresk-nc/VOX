import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl } from 'react-intl';
import moment from 'moment';

import Track from 'records/Track';
import { getCurrentTrack } from 'selectors/tracks';
import { nextTrack, reportPlayerError, updateInformer } from 'actions';
import player from 'lib/player';
import Playback from 'components/Playback';

const { app } = require('electron').remote;

export class PlaybackContainer extends React.Component {

    static displayName = 'PlaybackContainer';

    static propTypes = {
        currentTrack: React.PropTypes.instanceOf(Track),
        intl: React.PropTypes.object.isRequired,

        nextTrack: React.PropTypes.func.isRequired,
        reportPlayerError: React.PropTypes.func.isRequired,
        updateInformer: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            isChangingTime: false,
            currentTime: 0,
            progress: 0
        };

        this._onTimeUpdate = this._onTimeUpdate.bind(this);
        this._onTrackEnded = this._onTrackEnded.bind(this);
        this._onPlayerError = this._onPlayerError.bind(this);
        this._handleProgressClick = this._handleProgressClick.bind(this);
        this._handleProgressMouseDown = this._handleProgressMouseDown.bind(this);
        this._handleWindowMouseUp = this._handleWindowMouseUp.bind(this);
        this._handleWindowMouseMove = this._handleWindowMouseMove.bind(this);
    }

    componentDidMount() {
        player.on('timeupdate', this._onTimeUpdate);
        player.on('ended', this._onTrackEnded);
        player.on('error', this._onPlayerError);
    }

    _onTimeUpdate(currentTime, progress) {
        if (this.state.isChangingTime) {
            return;
        }

        this.setState({ currentTime, progress });
    }

    _onTrackEnded() {
        this.props.nextTrack();
        this.setState({ currentTime: 0 });
    }

    _onPlayerError() {
        const { reportPlayerError, currentTrack } = this.props;

        reportPlayerError(currentTrack.src, currentTrack.id);
    }

    _handleProgressClick(event) {
        const { currentTrack } = this.props;
        const progress = event.clientX * 100 / window.outerWidth;
        const currentTime = currentTrack.duration * (progress / 100);

        this.setState({ currentTime, progress });

        player.setProgress(currentTime);
        this._inform(currentTime);
    }

    _handleProgressMouseDown() {
        window.addEventListener('mousemove', this._handleWindowMouseMove, false);
        window.addEventListener('mouseup', this._handleWindowMouseUp, false);

        this.setState({ isChangingTime: true });
    }

    _handleWindowMouseMove(event) {
        const clientX = event.clientX;
        const windowWidth = window.outerWidth;
        const { currentTrack } = this.props;

        let progress;
        let currentTime;

        if (clientX < 0) {
            progress = 0;
            currentTime = 0;
        } else if (clientX > windowWidth) {
            progress = 100;
            currentTime = currentTrack.duration;
        } else {
            progress = clientX * 100 / windowWidth;
            currentTime = currentTrack.duration * (progress / 100);
        }

        this.setState({ currentTime, progress });
        this._inform(currentTime);
    }

    _inform(time) {
        const { updateInformer, intl } = this.props;

        updateInformer(
            intl.formatMessage(
                { id: 'informer.time' },
                { time: moment.duration(time, 'seconds').format('m:ss', { trim: false }) }
            )
        );
    }

    _handleWindowMouseUp() {
        window.removeEventListener('mousemove', this._handleWindowMouseMove);
        window.removeEventListener('mouseup', this._handleWindowMouseUp);

        this.setState({ isChangingTime: false });

        player.setProgress(this.state.currentTime);
    }

    _handleQuitClick() {
        process.platform === 'darwin' ? app.hide() : app.quit();
    }

    render() {
        const { currentTrack } = this.props;
        const { isChangingTime, currentTime, progress } = this.state;

        return (
            <Playback
                currentTrack={currentTrack}
                isChangingTime={isChangingTime}
                currentTime={currentTime}
                progress={progress}
                onProgressClick={this._handleProgressClick}
                onProgressMouseDown={this._handleProgressMouseDown}
                onQuitClick={this._handleQuitClick}
            />
        );
    }

}

function mapStateToProps(state) {
    return {
        currentTrack: getCurrentTrack(state)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        nextTrack,
        reportPlayerError,
        updateInformer
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(PlaybackContainer));
