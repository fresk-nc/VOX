import { shallow } from 'enzyme';
import { List } from 'immutable';
import _ from 'lodash';

import { TrackListContainer } from 'containers/TrackListContainer';
import TrackList from 'components/TrackList';
import Footer from 'components/Footer';
import DropArea from 'components/DropArea';
import Loading from 'components/Loading';
import keyboard from 'constants/KeyboardCodes';
import Track from 'records/Track';

function setup(props) {
    const handlers = {
        loadTracksFromDrop: sinon.spy(),
        removeTracks: sinon.spy(),
        playTrack: sinon.spy(),
        pauseTrack: sinon.spy(),
        selectTrack: sinon.spy(),
        selectNextTrack: sinon.spy(),
        selectPrevTrack: sinon.spy(),
        selectRangeTracks: sinon.spy(),
        setRootOfSelection: sinon.spy(),
        unsetRootOfSelection: sinon.spy(),
        moveUpSelection: sinon.spy(),
        moveDownSelection: sinon.spy(),
        updateTrackPosition: sinon.spy()
    };
    const component = shallow(
        <TrackListContainer {...props} {...handlers} />
    );

    return {
        handlers,
        component,
        dropArea: component.find(DropArea),
        trackList: component.find(TrackList),
        footer: component.find(Footer),
        loading: component.find(Loading)
    };
}

function mockProps(overrides) {
    return Object.assign({}, {
        trackCount: 0,
        totalDuration: 0,
        tracks: List(),
        currentTrack: undefined,
        selectedTracks: List([
            new Track({
                id: '100',
                title: 'title',
                artist: 'artist',
                album: 'album',
                duration: 150
            }),
            new Track({
                id: '101',
                title: 'title',
                artist: 'artist',
                album: 'album',
                duration: 150
            })
        ]),
        isMinimized: false,
        isLoading: false,
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

        it('should render Loading when tracks are loading', () => {
            const { loading } = setup(mockProps({ isLoading: true }));

            expect(loading).to.have.length(1);
        });

        it('should not render Loading when tracks are not loading', () => {
            const { loading } = setup(mockProps());

            expect(loading).to.have.length(0);
        });

        it('should call action playTrack with right args when double click on track', () => {
            const { component, handlers } = setup(mockProps());
            const instance = component.instance();

            instance._handleTrackDoubleClick(10);

            expect(handlers.playTrack).to.have.callCount(1);
            expect(handlers.playTrack).to.be.calledWith(10);
        });

        describe('click on track', () => {
            it('should call action selectRangeTracks with right args when click on track and press shift', () => {
                const { component, handlers } = setup(mockProps());
                const instance = component.instance();

                instance._handleTrackClick({ shiftKey: true }, 10);

                expect(handlers.selectRangeTracks).to.have.callCount(1);
                expect(handlers.selectRangeTracks).to.be.calledWith(10);
            });

            it('should call action selectTrack with right args when click on track and press meta', () => {
                const { component, handlers } = setup(mockProps());
                const instance = component.instance();

                instance._handleTrackClick({ metaKey: true }, 10);

                expect(handlers.selectTrack).to.have.callCount(1);
                expect(handlers.selectTrack).to.be.calledWith(10, {
                    resetSelected: false
                });
            });

            it('should call action selectTrack with right args when click on track', () => {
                const { component, handlers } = setup(mockProps());
                const instance = component.instance();

                instance._handleTrackClick({
                    shiftKey: false,
                    metaKey: false
                }, 10);

                expect(handlers.selectTrack).to.have.callCount(1);
                expect(handlers.selectTrack).to.be.calledWith(10, {
                    resetSelected: true
                });
            });
        });

        describe('keyup on window ->', () => {
            it('should call action unsetRootOfSelection when key is shift', () => {
                const { component, handlers } = setup(mockProps());

                component.instance()._handleWindowKeyUp({
                    which: keyboard.SHIFT
                });

                expect(handlers.unsetRootOfSelection).to.have.callCount(1);
            });

            it('should not call action unsetRootOfSelection when key is not shift', () => {
                const { component, handlers } = setup(mockProps());

                component.instance()._handleWindowKeyUp({
                    which: keyboard.UP
                });

                expect(handlers.unsetRootOfSelection).to.have.callCount(0);
            });
        });

        describe('keydown on window ->', () => {
            describe('key DOWN ->', () => {
                it('should call action selectNextTrack', () => {
                    const { component, handlers } = setup(mockProps());

                    component.instance()._handleWindowKeyDown({
                        which: keyboard.DOWN
                    });

                    expect(handlers.selectNextTrack).to.have.callCount(1);
                });

                it('should not call action selectNextTrack when window is minimized', () => {
                    const { component, handlers } = setup(mockProps({ isMinimized: true }));

                    component.instance()._handleWindowKeyDown({
                        which: keyboard.DOWN
                    });

                    expect(handlers.selectNextTrack).to.have.callCount(0);
                    expect(handlers.moveDownSelection).to.have.callCount(0);
                });

                it('should call action moveDownSelection when shift key is pressed', () => {
                    const { component, handlers } = setup(mockProps());

                    component.instance()._handleWindowKeyDown({
                        which: keyboard.DOWN,
                        shiftKey: true
                    });

                    expect(handlers.moveDownSelection).to.have.callCount(1);
                });

                it('should not call action moveDownSelection when window is minimized', () => {
                    const { component, handlers } = setup(mockProps({ isMinimized: true }));

                    component.instance()._handleWindowKeyDown({
                        which: keyboard.DOWN,
                        shiftKey: true
                    });

                    expect(handlers.moveDownSelection).to.have.callCount(0);
                });
            });

            describe('key UP ->', () => {
                it('should call action selectPrevTrack', () => {
                    const { component, handlers } = setup(mockProps());

                    component.instance()._handleWindowKeyDown({
                        which: keyboard.UP
                    });

                    expect(handlers.selectPrevTrack).to.have.callCount(1);
                });

                it('should not call action selectPrevTrack when window is minimized', () => {
                    const { component, handlers } = setup(mockProps({ isMinimized: true }));

                    component.instance()._handleWindowKeyDown({
                        which: keyboard.UP
                    });

                    expect(handlers.selectPrevTrack).to.have.callCount(0);
                });

                it('should call action moveUpSelection when shift key is pressed', () => {
                    const { component, handlers } = setup(mockProps());

                    component.instance()._handleWindowKeyDown({
                        which: keyboard.UP,
                        shiftKey: true
                    });

                    expect(handlers.moveUpSelection).to.have.callCount(1);
                });

                it('should not call action moveUpSelection when window is minimized', () => {
                    const { component, handlers } = setup(mockProps({ isMinimized: true }));

                    component.instance()._handleWindowKeyDown({
                        which: keyboard.UP,
                        shiftKey: true
                    });

                    expect(handlers.moveUpSelection).to.have.callCount(0);
                });
            });

            describe('key ENTER ->', () => {
                it('should call action playTrack with id of first track', () => {
                    const { component, handlers } = setup(mockProps({
                        selectedTracks: List(),
                        tracks: List([
                            new Track({ id: '1' }),
                            new Track({ id: '2' })
                        ])
                    }));

                    component.instance()._handleWindowKeyDown({
                        which: keyboard.ENTER
                    });

                    expect(handlers.playTrack).to.have.callCount(1);
                    expect(handlers.playTrack).to.be.calledWith('1');
                });

                it('should call action playTrack with id of first selected track', () => {
                    const { component, handlers } = setup(mockProps({
                        selectedTracks: List([
                            new Track({ id: '3' }),
                            new Track({ id: '4' })
                        ]),
                        tracks: List([
                            new Track({ id: '1' }),
                            new Track({ id: '2' })
                        ])
                    }));

                    component.instance()._handleWindowKeyDown({
                        which: keyboard.ENTER
                    });

                    expect(handlers.playTrack).to.have.callCount(1);
                    expect(handlers.playTrack).to.be.calledWith('3');
                });

                it('should not call action playTrack when there are no tracks and selected tracks', () => {
                    const { component, handlers } = setup(mockProps({
                        selectedTracks: List(),
                        tracks: List()
                    }));

                    component.instance()._handleWindowKeyDown({
                        which: keyboard.ENTER
                    });

                    expect(handlers.playTrack).to.have.callCount(0);
                });
            });

            describe('key SPACE ->', () => {
                it('should not process hotkey when there are no tracks, selected tracks and current track', function() {
                    const { component } = setup(mockProps({
                        currentTrack: undefined,
                        selectedTracks: List(),
                        tracks: List()
                    }));
                    const instance = component.instance();
                    const handlePressSpaceSpy = this.sinon.spy(instance, '_handlePressSpace');

                    instance._handleWindowKeyDown({
                        which: keyboard.SPACE
                    });

                    expect(handlePressSpaceSpy).to.have.callCount(0);
                });

                it('should process hotkey with first track', function() {
                    const { component } = setup(mockProps({
                        currentTrack: undefined,
                        selectedTracks: List(),
                        tracks: List([
                            new Track({ id: '1' }),
                            new Track({ id: '2' })
                        ])
                    }));
                    const instance = component.instance();
                    const handlePressSpaceSpy = this.sinon.spy(instance, '_handlePressSpace');

                    instance._handleWindowKeyDown({
                        which: keyboard.SPACE
                    });

                    expect(handlePressSpaceSpy).to.have.callCount(1);
                    expect(handlePressSpaceSpy).to.be.calledWith(new Track({ id: '1' }));
                });

                it('should process hotkey with first selected track', function() {
                    const { component } = setup(mockProps({
                        currentTrack: undefined,
                        selectedTracks: List([
                            new Track({ id: '3' }),
                            new Track({ id: '4' })
                        ]),
                        tracks: List([
                            new Track({ id: '1' }),
                            new Track({ id: '2' }),
                            new Track({ id: '3' }),
                            new Track({ id: '4' })
                        ])
                    }));
                    const instance = component.instance();
                    const handlePressSpaceSpy = this.sinon.spy(instance, '_handlePressSpace');

                    instance._handleWindowKeyDown({
                        which: keyboard.SPACE
                    });

                    expect(handlePressSpaceSpy).to.have.callCount(1);
                    expect(handlePressSpaceSpy).to.be.calledWith(new Track({ id: '3' }));
                });

                it('should process hotkey with current track', function() {
                    const { component } = setup(mockProps({
                        currentTrack: new Track({ id: '5' }),
                        selectedTracks: List([
                            new Track({ id: '3' }),
                            new Track({ id: '4' })
                        ]),
                        tracks: List([
                            new Track({ id: '1' }),
                            new Track({ id: '2' }),
                            new Track({ id: '3' }),
                            new Track({ id: '4' }),
                            new Track({ id: '5' })
                        ])
                    }));
                    const instance = component.instance();
                    const handlePressSpaceSpy = this.sinon.spy(instance, '_handlePressSpace');

                    instance._handleWindowKeyDown({
                        which: keyboard.SPACE
                    });

                    expect(handlePressSpaceSpy).to.have.callCount(1);
                    expect(handlePressSpaceSpy).to.be.calledWith(new Track({ id: '5' }));
                });

                it('should call action pauseTrack when the track is playing', () => {
                    const { component, handlers } = setup(mockProps({
                        currentTrack: undefined,
                        selectedTracks: List(),
                        tracks: List([
                            new Track({ id: '1', isPlay: true })
                        ])
                    }));

                    component.instance()._handleWindowKeyDown({
                        which: keyboard.SPACE
                    });

                    expect(handlers.pauseTrack).to.have.callCount(1);
                });

                it('should call action playTrack when the track is current', () => {
                    const { component, handlers } = setup(mockProps({
                        currentTrack: undefined,
                        selectedTracks: List(),
                        tracks: List([
                            new Track({ id: '1', isCurrent: true })
                        ])
                    }));

                    component.instance()._handleWindowKeyDown({
                        which: keyboard.SPACE
                    });

                    expect(handlers.playTrack).to.have.callCount(1);
                });

                it('should call action playTrack with right args when the track is not current', () => {
                    const mock = mockProps({
                        currentTrack: undefined,
                        selectedTracks: List(),
                        tracks: List([
                            new Track({ id: '1' })
                        ])
                    });
                    const { component, handlers } = setup(mock);
                    const trackId = mock.tracks.first().id;

                    component.instance()._handleWindowKeyDown({
                        which: keyboard.SPACE
                    });

                    expect(handlers.playTrack).to.have.callCount(1);
                    expect(handlers.playTrack).to.be.calledWith(trackId);
                });
            });

            describe('key SHIFT ->', () => {
                it('should call action setRootOfSelection', () => {
                    const { component, handlers } = setup(mockProps());

                    component.instance()._handleWindowKeyDown({
                        which: keyboard.SHIFT
                    });

                    expect(handlers.setRootOfSelection).to.have.callCount(1);
                });

                it('should not call action setRootOfSelection when window is minimized', () => {
                    const { component, handlers } = setup(mockProps({ isMinimized: true }));

                    component.instance()._handleWindowKeyDown({
                        which: keyboard.SHIFT
                    });

                    expect(handlers.setRootOfSelection).to.have.callCount(0);
                });
            });
        });

        describe('context menu', () => {
            beforeEach(function() {
                this.sinon.stub(_, 'delay', function(cb) {
                    cb();
                });
            });

            it('should select track', function() {
                const { component, handlers } = setup(mockProps());
                const instance = component.instance();

                this.sinon.stub(instance, '_showContextMenu');

                instance._handleTrackContextMenu(new Track({
                    id: '1',
                    isSelected: true
                }));

                expect(handlers.selectTrack).to.have.callCount(1);
                expect(handlers.selectTrack).to.be.calledWith('1', {
                    resetSelected: false
                });
            });

            it('should select track and reset other selected when track is not selected', function() {
                const { component, handlers } = setup(mockProps());
                const instance = component.instance();

                this.sinon.stub(instance, '_showContextMenu');

                instance._handleTrackContextMenu(new Track({ id: '1' }));

                expect(handlers.selectTrack).to.have.callCount(1);
                expect(handlers.selectTrack).to.be.calledWith('1', {
                    resetSelected: true
                });
            });

            it('should show the context menu', function() {
                const { component } = setup(mockProps());
                const instance = component.instance();
                const showContextMenuStub = this.sinon.stub(instance, '_showContextMenu');

                instance._handleTrackContextMenu(new Track({ id: '1' }));

                expect(showContextMenuStub).to.have.callCount(1);
            });
        });
    });
});
