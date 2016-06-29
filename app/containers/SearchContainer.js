import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';
import _ from 'lodash';

import { searchTracks } from 'selectors/tracks';
import { setSearchText, selectTrack, hideSearch } from 'actions';
import SearchComponent from 'components/Search';
import Search from 'records/Search';
import keyboard from 'constants/KeyboardCodes';

export class SearchContainer extends React.Component {

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

        this._searchDebounced = _.debounce(this._search.bind(this), 30);
        this._handleInputChange = this._handleInputChange.bind(this);
        this._handleTrackDoubleClick = this._handleTrackDoubleClick.bind(this);
        this._handleInputCleanerClick = this._handleInputCleanerClick.bind(this);
        this._handleInputKeyDown = this._handleInputKeyDown.bind(this);
    }

    _handleTrackDoubleClick(id) {
        const { selectTrack, hideSearch } = this.props;

        selectTrack(id);
        hideSearch();
    }

    _handleInputChange(event) {
        this._searchDebounced(event.target.value);
    }

    _handleInputKeyDown(event) {
        event.stopPropagation();

        if (event.which === keyboard.ESCAPE) {
            this.props.hideSearch();
        }
    }

    _handleInputCleanerClick() {
        this.props.setSearchText(null);
    }

    _search(text) {
        this.props.setSearchText(text);
    }

    render() {
        const { tracks, search, hideSearch } = this.props;

        return (
            <SearchComponent
                tracks={tracks}
                searchText={search.text}
                onInputCleanerClick={this._handleInputCleanerClick}
                onInputChange={this._handleInputChange}
                onInputKeyDown={this._handleInputKeyDown}
                onTrackDoubleClick={this._handleTrackDoubleClick}
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
