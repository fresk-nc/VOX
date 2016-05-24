import { DropTarget } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { FormattedMessage } from 'react-intl';
import styles from './DropArea.styl';

function collect(connect) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

const spec = {
    drop(props, monitor) {
        const sourceItem = monitor.getItem();
        props.onDropEnd(sourceItem.files.map((f) => f.path));
    }
};

class DropArea extends React.Component {

    static displayName = 'DropArea';

    static propTypes = {
        onDropEnd: React.PropTypes.func.isRequired,
        connectDropTarget: React.PropTypes.func.isRequired
    };

    render() {
        const { connectDropTarget } = this.props;

        return connectDropTarget(
            <div className={styles.wrap}>
                <p className={styles.title}>
                    <FormattedMessage id="dropArea.title" />
                </p>
                <p className={styles.detail}>
                    <FormattedMessage id="dropArea.detail" />
                </p>
            </div>
        );
    }

}

export default DropTarget(NativeTypes.FILE, spec, collect)(DropArea);
