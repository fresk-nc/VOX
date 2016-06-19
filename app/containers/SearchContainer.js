import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debounce } from 'lodash';
import { List } from 'immutable';

import { searchTracks } from 'selectors/tracks';
import { setSearchText, selectTrack, hideSearch } from 'actions';
import SearchComponent from 'components/Search';
import Search from 'records/Search';

class SearchContainer extends React.Component {

    static displayName = 'SearchContainer';

    static propTypes = {
        tracks: React.PropTypes.instanceOf(List),
        search: React.PropTypes.instanceOf(Search),

        selectTrack: React.PropTypes.func.isRequired,
        setSearchText: React.PropTypes.func.isRequired,
        hideSearch: React.PropTypes.func.isRequired
    };

    constructor() {
        super();

        this._searchDebounced = debounce(this._search.bind(this), 30);
    }

    _handleTrackDoubleClick(id) {
        const { selectTrack, hideSearch } = this.props;

        selectTrack(id);
        hideSearch();
    }

    _handleInputChange(event) {
        this._searchDebounced(event.target.value);
    }

    _search(text) {
        this.props.setSearchText(text);
    }

    render() {
        const { tracks, search, hideSearch, setSearchText } = this.props;

        return (
            <SearchComponent
                tracks={tracks.toJS()}
                searchText={search.text}
                onInputCleanerClick={() => setSearchText(null)}
                onInputChange={this._handleInputChange.bind(this)}
                onInputKeyDown={(e) => e.stopPropagation()}
                onTrackDoubleClick={this._handleTrackDoubleClick.bind(this)}
                onOverlayClick={hideSearch}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        tracks: searchTracks(state),
        search: state.search
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setSearchText,
        selectTrack,
        hideSearch
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
