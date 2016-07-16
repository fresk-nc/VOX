import { connect } from 'react-redux';
import PlaybackInformer from 'components/PlaybackInformer';

function mapStateToProps(state) {
    return {
        message: state.informer
    };
}

export default connect(mapStateToProps)(PlaybackInformer);
