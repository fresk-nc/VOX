import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import SearchContainer from 'containers/SearchContainer';
import ToolbarContainer from 'containers/ToolbarContainer';
import TrackListContainer from 'containers/TrackListContainer';
import styles from './Playlist.styl';

export default class Playlist extends React.Component {

    static displayName = 'Playlist';

    static propTypes = {
        showSearch: React.PropTypes.bool.isRequired
    };

    render() {
        return (
            <div className={styles.wrap}>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="search"
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}
                >
                    {this.props.showSearch ? <SearchContainer /> : null}
                </ReactCSSTransitionGroup>
                <ToolbarContainer />
                <div className={styles.listWrap}>
                    <TrackListContainer />
                </div>
            </div>
        );
    }
}
