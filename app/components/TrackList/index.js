export default class TrackListReact extends React.Component {

    static displayName = 'TrackList';

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

};
