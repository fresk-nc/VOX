import { shallow } from 'enzyme';
import { List } from 'immutable';

import TrackList from 'components/TrackList';
import TrackComponent from 'components/Track';
import Track from 'records/Track';

function setup(props) {
    const handlers = {
        onTrackClick: sinon.spy(),
        onTrackDoubleClick: sinon.spy(),
        onTrackContextMenu: sinon.spy(),
        onDropTrackHover: sinon.spy()
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
    return List([
        new Track({
            id: 1,
            artist: 'artist 1',
            title: 'title 1',
            duration: 100
        }),
        new Track({
            id: 2,
            artist: 'artist 2',
            title: 'title 2',
            duration: 200
        })
    ]);
}

describe('components', () => {
    describe('TrackList', () => {
        it('should render the entire list of tracks', () => {
            const tracks = mockTracks();
            const { component } = setup({ tracks });

            expect(component.find(TrackComponent)).to.have.length(2);
        });
    });
});
