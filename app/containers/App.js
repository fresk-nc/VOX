import { connect } from 'react-redux';

import PlaybackContainer from './PlaybackContainer.js';
import PlaybackBarContainer from './PlaybackBarContainer.js';
import Playlist from './Playlist.js';

class App extends React.Component {

    static displayName = 'App';

    static propTypes = {
        settings: React.PropTypes.object.isRequired
    };

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
        return (
            <div>
                <PlaybackContainer />
                <PlaybackBarContainer />
                <Playlist />
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        settings: state.settings
    };
}

export default connect(
    mapStateToProps
)(App);
