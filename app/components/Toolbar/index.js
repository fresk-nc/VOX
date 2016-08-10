import classNames from 'classnames';
import { injectIntl } from 'react-intl';

import styles from './Toolbar.styl';

class Toolbar extends React.PureComponent {

    static displayName = 'Toolbar';

    static propTypes = {
        trackCount: React.PropTypes.number.isRequired,
        intl: React.PropTypes.object.isRequired,

        onAddClick: React.PropTypes.func.isRequired,
        onClearClick: React.PropTypes.func.isRequired
    };

    render() {
        const { trackCount, onAddClick, onClearClick, intl } = this.props;
        const clearButtonClass = classNames({
            [styles.disableButton]: !trackCount,
            [styles.button]: trackCount
        });

        return (
            <div className={styles.wrap}>
                <span
                    className={styles.button}
                    onClick={onAddClick}
                    title={intl.formatMessage({ id: 'toolbar.add' })}
                >
                    <i className="material-icons">add_circle_outline</i>
                </span>
                <span
                    className={clearButtonClass}
                    onClick={onClearClick}
                    title={intl.formatMessage({ id: 'toolbar.clear' })}
                >
                    <i className="material-icons">highlight_off</i>
                </span>
            </div>
        );
    }
}

export default injectIntl(Toolbar);
