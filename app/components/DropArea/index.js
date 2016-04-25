import { FormattedMessage } from 'react-intl';
import styles from './DropArea.styl';

export default class DropArea extends React.Component {

    static displayName = 'DropArea';

    render() {
        return (
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
