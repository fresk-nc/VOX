import { FormattedMessage } from 'react-intl';
import styles from './Loading.styl';

export default class Loading extends React.Component {

    static displayName = 'Loading';

    render() {
        return (
            <div className={styles.wrap}>
                <h3 className={styles.title}>
                    <FormattedMessage id="loading" />
                </h3>
                <div className={styles.spinner}></div>
            </div>
        );
    }
}
