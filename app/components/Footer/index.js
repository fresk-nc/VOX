import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

import styles from './Footer.styl';

class Footer extends React.PureComponent {

    static displayName = 'Footer';

    static propTypes = {
        trackCount: React.PropTypes.number.isRequired,
        totalDuration: React.PropTypes.number.isRequired,
        intl: React.PropTypes.object.isRequired
    };

    render() {
        const { trackCount, totalDuration, intl } = this.props;
        const duration = moment.duration(totalDuration, 'seconds').format(
            intl.formatMessage({ id: 'totalDuration' })
        );

        return (
            <div className={styles.wrap}>
                <FormattedMessage
                    id='tracksInfo'
                    values={{
                        count: trackCount,
                        duration: duration
                    }}
                />
            </div>
        );
    }
}

export default injectIntl(Footer);
