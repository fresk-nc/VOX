import styles from './Toolbar.styl';
import classNames from 'classnames';

export default class Toolbar extends React.Component {

    static displayName = 'Toolbar';

    render() {
        const { trackCount, onAddClicked, onClearClicked } = this.props;
        const clearButtonClass = classNames({
            [styles.disableButton]: !trackCount,
            [styles.button]: trackCount
        });

        return (
            <div className={styles.wrap}>
                <button className={styles.button} onClick={onAddClicked}>
                    <i className="material-icons">add_circle_outline</i>
                </button>
                <button className={clearButtonClass} onClick={onClearClicked}>
                    <i className="material-icons">highlight_off</i>
                </button>
            </div>
        );
    }

};
