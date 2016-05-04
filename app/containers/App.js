import { connect } from 'react-redux';

import PlaybackContainer from './PlaybackContainer.js';
import PlaybackBarContainer from './PlaybackBarContainer.js';
import Playlist from './Playlist.js';

//const BrowserWindow = require('electron').remote.BrowserWindow;

class App extends React.Component {

    static displayName = 'App';

    static propTypes = {
        settings: React.PropTypes.object.isRequired
    };

    componentDidMount() {
        /*
        if (this.props.settings.get('minimize')) {
            BrowserWindow.getAllWindows()[0].setSize(320, 122);
        } else {
            BrowserWindow.getAllWindows()[0].setSize(320, 570);
        }
        */

        document.addEventListener('dragover', function(event) {
            event.preventDefault();
            return false;
        }, false);

        document.addEventListener('drop', function(event) {
            event.preventDefault();
            return false;
        }, false);
    }

    componentWillReceiveProps(/*nextProps*/) {
        /*
         if (nextProps.settings.get('minimize') !== this.props.settings.get('minimize')) {
            if (nextProps.settings.get('minimize')) {
                BrowserWindow.getFocusedWindow().setSize(320, 122);
            } else {
                BrowserWindow.getFocusedWindow().setSize(320, 570);
            }
         }
        */
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
