import { Playlist } from 'containers/Playlist';
import Toolbar from 'components/Toolbar';
import TrackList from 'components/TrackList';
import Footer from 'components/Footer';
import DropArea from 'components/DropArea';
import { shallow } from 'enzyme';
import { List } from 'immutable';

function setup(props) {
    const handlers = {
        loadTracks: sinon.spy(),
        loadTracksFromDrop: sinon.spy(),
        clearTracks: sinon.spy(),
        removeTrack: sinon.spy(),
        playTrack: sinon.spy()
    };
    const component = shallow(
        <Playlist {...props} {...handlers} />
    );

    return {
        handlers,
        component,
        toolbar: component.find(Toolbar),
        dropArea: component.find(DropArea),
        trackList: component.find(TrackList),
        footer: component.find(Footer)
    };
}

function mockProps(overrides) {
    return Object.assign({}, {
        trackCount: 0,
        totalDuration: 0,
        tracks: List([]),
        intl: {}
    }, overrides);
}

describe('containers', () => {
    describe('Playlist', () => {
        it('should render the toolbar', () => {
            const { toolbar } = setup(mockProps());

            expect(toolbar).to.have.length(1);
        });

        it('should render DropArea instead TrackList and Footer when there are no tracks', () => {
            const { dropArea, trackList, footer } = setup(mockProps());

            expect(dropArea).to.have.length(1);
            expect(trackList).to.have.length(0);
            expect(footer).to.have.length(0);
        });

        it('should render TrackList and Footer instead DropArea when there are tracks', () => {
            const { dropArea, trackList, footer } = setup(mockProps({ trackCount: 10 }));

            expect(dropArea).to.have.length(0);
            expect(trackList).to.have.length(1);
            expect(footer).to.have.length(1);
        });
    });
});
