import moment from 'moment';
import Highlighter from 'react-highlight-words';
import { FormattedMessage, injectIntl } from 'react-intl';
import { escapeRegExp } from 'lodash';
import Baron from 'react-baron';

import styles from './Search.styl';

class Search extends React.Component {

    static displayName = 'Search';

    static propTypes = {
        tracks: React.PropTypes.array.isRequired,
        searchText: React.PropTypes.string,
        intl: React.PropTypes.object.isRequired,

        onInputCleanerClick: React.PropTypes.func.isRequired,
        onInputChange: React.PropTypes.func.isRequired,
        onInputKeyDown: React.PropTypes.func.isRequired,
        onTrackDoubleClick: React.PropTypes.func.isRequired,
        onOverlayClick: React.PropTypes.func.isRequired
    };

    componentDidMount() {
        this._input.focus();
    }

    componentDidUpdate() {
        this._input.focus();
    }

    _renderTrack(searchWords, track) {
        const { onTrackDoubleClick } = this.props;

        return (
            <div
                className={styles.track}
                key={track.id}
                onDoubleClick={() => onTrackDoubleClick(track.id)}
            >
                <div className={styles.trackFirstLine}>
                    <span className={styles.trackTitle}>
                        <Highlighter
                            highlightClassName={styles.highlight}
                            searchWords={searchWords}
                            textToHighlight={track.title}
                        />
                    </span>
                    <span>
                        {moment.duration(track.duration, 'seconds').format('m:ss', { trim: false })}
                    </span>
                </div>
                <Highlighter
                    highlightClassName={styles.highlight}
                    searchWords={searchWords}
                    textToHighlight={`${track.artist} - ${track.album}`}
                />
            </div>
        );
    }

    _renderResult() {
        const { tracks, searchText } = this.props;

        if (tracks.length) {
            const searchWords = escapeRegExp(searchText).split(/\s/).filter((word) => word);

            return (
                <div className={styles.trackList}>
                    <Baron barOnCls="baron">
                        {tracks.map(this._renderTrack.bind(this, searchWords))}
                    </Baron>
                </div>
            );
        }

        if (searchText) {
            return (
                <div className={styles.notFound}>
                    <h3 className={styles.notFoundTitle}>
                        <FormattedMessage id='search.notFoundTitle' />
                    </h3>
                    <p className={styles.notFoundText}>
                        <FormattedMessage id='search.notFoundText' />
                    </p>
                </div>
            );
        }
    }

    _renderInput() {
        const {
            searchText,
            onInputChange,
            onInputKeyDown,
            onInputCleanerClick,
            intl
        } = this.props;

        let inputCleaner;

        if (searchText) {
            inputCleaner = (
                <span className={styles.inputCleaner} onClick={onInputCleanerClick}>
                    <i className="material-icons">clear</i>
                </span>
            );
        }

        return (
            <div className={styles.inputWrap}>
                <input
                    className={styles.input}
                    type="text"
                    value={searchText || ''}
                    onChange={onInputChange}
                    onKeyDown={onInputKeyDown}
                    ref={(c) => this._input = c}
                    placeholder={intl.formatMessage({ id: 'search.inputPlaceholder' })}
                />
                {inputCleaner}
            </div>
        );
    }

    render() {
        const { onOverlayClick } = this.props;

        return (
            <div className={styles.wrap}>
                <div className={styles.overlay} onClick={onOverlayClick}></div>
                {this._renderInput()}
                {this._renderResult()}
            </div>
        );
    }
}

export default injectIntl(Search);
