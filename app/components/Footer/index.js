import { FormattedMessage } from 'react-intl';
import styles from './Footer.styl';

export default class Footer extends React.Component {

    static displayName = 'Footer';

    static propTypes = {
        trackCount: React.PropTypes.number.isRequired,
        totalMinutes: React.PropTypes.number.isRequired,
        totalSeconds: React.PropTypes.number.isRequired
    };

    render() {
        const { trackCount, totalMinutes, totalSeconds } = this.props;

        return (
            <div className={styles.wrap}>
                <FormattedMessage
                    id='footer.total'
                    values={{
                        totalCount: trackCount,
                        min: totalMinutes,
                        sec: totalSeconds
                    }}
                />
            </div>
        );
    }

};
