import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './PlaybackInformer.styl';

export default class PlaybackInformer extends React.Component {

    static displayName = 'PlaybackInformer';

    static propTypes = {
        message: React.PropTypes.string.isRequired
    };

    _renderMessage() {
        const { message } = this.props;

        if (message) {
            return (
                <span>{message}</span>
            );
        }

        return null;
    }

    render() {
        return (
            <ReactCSSTransitionGroup
                className={styles.wrap}
                component="div"
                transitionName="informer"
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}
            >
                {this._renderMessage()}
            </ReactCSSTransitionGroup>
        );
    }
}
