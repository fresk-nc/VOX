import { connect } from 'react-redux';
import Playlist from 'components/Playlist';

function mapStateToProps(state) {
    return {
        showSearch: state.search.isShowed
    };
}

export default connect(mapStateToProps)(Playlist);
