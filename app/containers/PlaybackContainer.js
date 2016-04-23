import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCurrentTrack } from 'reducers/tracks';
import { nextTrack } from 'actions';
import player from 'lib/player';
import Playback from 'components/Playback';

class PlaybackContainer extends React.Component {

    static displayName = 'PlaybackContainer';

    constructor(props) {
        super(props);

        this.state = {
            isChangingTime: false,
            currentTime: 0,
            progress: 0
        };

        this._onTimeUpdate = this._onTimeUpdate.bind(this);
        this._onTrackEnded = this._onTrackEnded.bind(this);
        this._handleProgressClick = this._handleProgressClick.bind(this);
        this._handleProgressMouseDown = this._handleProgressMouseDown.bind(this);
        this._handleWindowMouseUp = this._handleWindowMouseUp.bind(this);
        this._handleWindowMouseMove = this._handleWindowMouseMove.bind(this);
    }

    componentDidMount() {
        player.on('timeupdate', this._onTimeUpdate);
        player.on('ended', this._onTrackEnded);
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

    _handleProgressClick(event) {
        const {currentTrack } = this.props;
        const progress = event.clientX * 100 / window.outerWidth;
        const currentTime = currentTrack.get('duration') * (progress / 100);

        player.setProgress(currentTime);
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
            currentTime = currentTrack.get('duration');
         } else {
            progress = clientX * 100 / windowWidth;
            currentTime = currentTrack.get('duration') * (progress / 100);
         }

         this.setState({ currentTime, progress });
    }

    _handleWindowMouseUp() {
         window.removeEventListener('mousemove', this._handleWindowMouseMove);
         window.removeEventListener('mouseup', this._handleWindowMouseUp);

         this.setState({ isChangingTime: false });

         player.setProgress(this.state.currentTime);
    }

    render() {
        const {currentTrack } = this.props;
        const { isChangingTime, currentTime, progress } = this.state;

        return (
            <Playback
                currentTrack={currentTrack && currentTrack.toJS()}
                isChangingTime={isChangingTime}
                currentTime={currentTime}
                progress={progress}
                onProgressClicked={this._handleProgressClick}
                onProgressMouseDown={this._handleProgressMouseDown}
            />
        );
    }

}

function mapStateToProps(state) {
    return {
        currentTrack: getCurrentTrack(state.tracks)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        nextTrack
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaybackContainer);
