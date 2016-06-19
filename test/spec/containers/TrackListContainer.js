import { shallow } from 'enzyme';
import { List } from 'immutable';

import { TrackListContainer } from 'containers/TrackListContainer';
import TrackList from 'components/TrackList';
import Footer from 'components/Footer';
import DropArea from 'components/DropArea';
import keyboard from 'constants/KeyboardCodes';
import Track from 'records/Track';

function setup(props) {
    const handlers = {
        loadTracksFromDrop: sinon.spy(),
        removeTrack: sinon.spy(),
        playTrack: sinon.spy(),
        pauseTrack: sinon.spy(),
        selectTrack: sinon.spy(),
        selectNextTrack: sinon.spy(),
        selectPrevTrack: sinon.spy()
    };
    const component = shallow(
        <TrackListContainer {...props} {...handlers} />
    );

    return {
        handlers,
        component,
        dropArea: component.find(DropArea),
        trackList: component.find(TrackList),
        footer: component.find(Footer)
    };
}

function mockProps(overrides) {
    return Object.assign({}, {
        trackCount: 0,
        totalDuration: 0,
        tracks: List(),
        selectedTrack: new Track({
            id: '100',
            title: 'title',
            artist: 'artist',
            album: 'album',
            duration: 150
        }),
        isMinimized: false,
        intl: {}
    }, overrides);
}

describe('containers', () => {
    describe('TrackListContainer', () => {
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

        describe('hotkeys ->', () => {
            it('should not call any action when the window is minimized', () => {
                const { component } = setup(mockProps({ isMinimized: true }));
                const instance = component.instance();
                const _processKeySpy = sinon.spy(instance._processKey);

                instance._handleWindowKeyDown({ which: 'any key' });

                expect(_processKeySpy).to.have.callCount(0);
            });

            it('should call action selectNextTrack when key is DOWN', () => {
                const { component, handlers } = setup(mockProps());

                component.instance()._handleWindowKeyDown({ which: keyboard.DOWN });

                expect(handlers.selectNextTrack).to.have.callCount(1);
            });

            it('should call action selectPrevTrack when key is UP', () => {
                const { component, handlers } = setup(mockProps());

                component.instance()._handleWindowKeyDown({ which: keyboard.UP });

                expect(handlers.selectPrevTrack).to.have.callCount(1);
            });

            it('should call action playTrack with right args when key is ENTER and there is the selected track', () => {
                const mock = mockProps();
                const { component, handlers } = setup(mock);
                const trackId = mock.selectedTrack.id;

                component.instance()._handleWindowKeyDown({ which: keyboard.ENTER });

                expect(handlers.playTrack).to.have.callCount(1);
                expect(handlers.playTrack).to.be.calledWith(trackId);
            });

            it('should not call action playTrack when key is ENTER and there is no the selected track', () => {
                const { component, handlers } = setup(mockProps({
                    selectedTrack: undefined
                }));

                component.instance()._handleWindowKeyDown({ which: keyboard.ENTER });

                expect(handlers.playTrack).to.have.callCount(0);
            });

            it('should call action pauseTrack when key is SPACE and the selected track is playing', () => {
                const { component, handlers } = setup(mockProps({
                    selectedTrack: new Track({ isPlay: true })
                }));

                component.instance()._handleWindowKeyDown({ which: keyboard.SPACE });

                expect(handlers.pauseTrack).to.have.callCount(1);
            });

            it('should call action playTrack when key is SPACE and the selected track is current', () => {
                const { component, handlers } = setup(mockProps({
                    selectedTrack: new Track({ isCurrent: true })
                }));

                component.instance()._handleWindowKeyDown({ which: keyboard.SPACE });

                expect(handlers.playTrack).to.have.callCount(1);
            });

            it('should call action playTrack with right args when key is SPACE and the selected track is not current', () => {
                const mock = mockProps();
                const { component, handlers } = setup(mock);
                const trackId = mock.selectedTrack.id;

                component.instance()._handleWindowKeyDown({ which: keyboard.SPACE });

                expect(handlers.playTrack).to.have.callCount(1);
                expect(handlers.playTrack).to.be.calledWith(trackId);
            });
        });
    });
});
