import styles from './TrackListWrapper.styl';

export default class TrackListWrapper extends React.Component {

    static displayName = 'TrackListWrapper';

    render() {
        return (
            <div className={styles.wrap}>
                {this.props.children}
            </div>
        );
    }

};
