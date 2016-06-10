import { shallow } from 'enzyme';
import { List } from 'immutable';

import { Playlist } from 'containers/Playlist';
import Toolbar from 'components/Toolbar';
import TrackList from 'components/TrackList';
import Footer from 'components/Footer';
import DropArea from 'components/DropArea';
import keyboard from 'constants/KeyboardCodes';
import Track from 'records/Track';

function setup(props) {
    const handlers = {
        loadTracks: sinon.spy(),
        loadTracksFromDrop: sinon.spy(),
        clearTracks: sinon.spy(),
        removeTrack: sinon.spy(),
        playTrack: sinon.spy(),
        pauseTrack: sinon.spy(),
        selectTrack: sinon.spy(),
        selectNextTrack: sinon.spy(),
        selectPrevTrack: sinon.spy()
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

        describe('_handleWindowKeyDown', () => {
            beforeEach(function() {
                this.mockContext = {
                    props: {
                        selectNextTrack: this.sinon.spy(),
                        selectPrevTrack: this.sinon.spy(),
                        selectedTrack: new Track({ id: 101 }),
                        playTrack: this.sinon.spy(),
                        pauseTrack: this.sinon.spy()
                    }
                };
            });

            it('should call action selectNextTrack when key is DOWN', function() {
                Playlist.prototype._handleWindowKeyDown.call(this.mockContext, {
                    which: keyboard.DOWN
                });

                expect(this.mockContext.props.selectNextTrack).to.have.callCount(1);
            });

            it('should call action selectPrevTrack when key is UP', function() {
                Playlist.prototype._handleWindowKeyDown.call(this.mockContext, {
                    which: keyboard.UP
                });

                expect(this.mockContext.props.selectPrevTrack).to.have.callCount(1);
            });

            it('should call action playTrack with right args when key is ENTER and there is the selected track', function() {
                const trackId = this.mockContext.props.selectedTrack.id;

                Playlist.prototype._handleWindowKeyDown.call(this.mockContext, {
                    which: keyboard.ENTER
                });

                expect(this.mockContext.props.playTrack).to.have.callCount(1);
                expect(this.mockContext.props.playTrack).to.be.calledWith(trackId);
            });

            it('should not call action playTrack when key is ENTER and there is no the selected track', function() {
                this.mockContext.props.selectedTrack = undefined;

                Playlist.prototype._handleWindowKeyDown.call(this.mockContext, {
                    which: keyboard.ENTER
                });

                expect(this.mockContext.props.playTrack).to.have.callCount(0);
            });

            it('should call action pauseTrack when key is SPACE and the selected track is playing', function() {
                this.mockContext.props.selectedTrack = new Track({ isPlay: true });

                Playlist.prototype._handleWindowKeyDown.call(this.mockContext, {
                    which: keyboard.SPACE
                });

                expect(this.mockContext.props.pauseTrack).to.have.callCount(1);
            });

            it('should call action playTrack when key is SPACE and the selected track is current', function() {
                this.mockContext.props.selectedTrack = new Track({ isCurrent: true });

                Playlist.prototype._handleWindowKeyDown.call(this.mockContext, {
                    which: keyboard.SPACE
                });

                expect(this.mockContext.props.playTrack).to.have.callCount(1);
            });

            it('should call action playTrack with right args when key is SPACE and the selected track is not current', function() {
                const trackId = this.mockContext.props.selectedTrack.id;

                Playlist.prototype._handleWindowKeyDown.call(this.mockContext, {
                    which: keyboard.SPACE
                });

                expect(this.mockContext.props.playTrack).to.have.callCount(1);
                expect(this.mockContext.props.playTrack).to.be.calledWith(trackId);
            });
        });
    });
});
