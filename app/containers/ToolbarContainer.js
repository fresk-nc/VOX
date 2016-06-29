import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCount } from 'selectors/tracks';
import { loadTracks, clearTracks } from 'actions';
import Toolbar from 'components/Toolbar';

function mapStateToProps(state) {
    return {
        trackCount: getCount(state)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onAddClick: loadTracks,
        onClearClick: clearTracks
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
