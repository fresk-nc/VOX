import PureRenderMixin from 'react-addons-pure-render-mixin';
import styles from './Toolbar.styl';
import classNames from 'classnames';

export default class Toolbar extends React.Component {

    static displayName = 'Toolbar';

    static propTypes = {
        trackCount: React.PropTypes.number.isRequired,

        onAddClick: React.PropTypes.func.isRequired,
        onClearClick: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const { trackCount, onAddClick, onClearClick } = this.props;
        const clearButtonClass = classNames({
            [styles.disableButton]: !trackCount,
            [styles.button]: trackCount
        });

        return (
            <div className={styles.wrap}>
                <button className={styles.button} onClick={onAddClick}>
                    <i className="material-icons">add_circle_outline</i>
                </button>
                <button className={clearButtonClass} onClick={onClearClick}>
                    <i className="material-icons">highlight_off</i>
                </button>
            </div>
        );
    }

}
