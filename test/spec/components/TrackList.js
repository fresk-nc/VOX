import TrackList from 'components/TrackList';
import Track from 'components/Track';
import { shallow } from 'enzyme';

function setup(props) {
    const handlers = {
        onTrackDoubleClick: sinon.spy(),
        onTrackContextMenu: sinon.spy()
    };
    const component = shallow(
        <TrackList {...props} {...handlers} />
    );

    return {
        handlers,
        component
    };
}

function mockTracks() {
    return [
        {
            id: 1,
            artist: 'artist 1',
            title: 'title 1',
            duration: 100,
            isCurrent: false
        },
        {
            id: 2,
            artist: 'artist 2',
            title: 'title 2',
            duration: 200,
            isCurrent: true
        }
    ];
}

describe('components', () => {
    describe('TrackList', () => {
        it('should render the entire list of tracks', () => {
            const tracks = mockTracks();
            const { component } = setup({ tracks });

            expect(component.find(Track)).to.have.length(2);
        });
    });
});
