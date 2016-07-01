import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';
import { injectIntl } from 'react-intl';

import styles from './Toolbar.styl';

class Toolbar extends React.Component {

    static displayName = 'Toolbar';

    static propTypes = {
        trackCount: React.PropTypes.number.isRequired,
        intl: React.PropTypes.object.isRequired,

        onAddClick: React.PropTypes.func.isRequired,
        onClearClick: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const { trackCount, onAddClick, onClearClick, intl } = this.props;
        const clearButtonClass = classNames({
            [styles.disableButton]: !trackCount,
            [styles.button]: trackCount
        });

        return (
            <div className={styles.wrap}>
                <button
                    className={styles.button}
                    onClick={onAddClick}
                    title={intl.formatMessage({ id: 'toolbar.add' })}
                >
                    <i className="material-icons">add_circle_outline</i>
                </button>
                <button
                    className={clearButtonClass}
                    onClick={onClearClick}
                    title={intl.formatMessage({ id: 'toolbar.clear' })}
                >
                    <i className="material-icons">highlight_off</i>
                </button>
            </div>
        );
    }
}

export default injectIntl(Toolbar);
