import { shallow } from 'enzyme';
import _ from 'lodash';

import { PlaybackBarContainer } from 'containers/PlaybackBarContainer';
import PlaybackBar from 'components/PlaybackBar';
import Settings from 'records/Settings';
import Track from 'records/Track';
import Search from 'records/Search';

function setup(props) {
    const handlers = {
        prevTrack: sinon.spy(),
        nextTrack: sinon.spy(),
        playTrack: sinon.spy(),
        pauseTrack: sinon.spy(),
        loadTracks: sinon.spy(),
        toggleMinimize: sinon.spy(),
        showSearch: sinon.spy(),
        hideSearch: sinon.spy()
    };
    const component = shallow(
        <PlaybackBarContainer {...props} {...handlers} />
    );

    return {
        handlers,
        component,
        playbackBar: component.find(PlaybackBar)
    };
}

function mockProps(overrides) {
    return Object.assign({}, {
        currentTrack: new Track(),
        settings: new Settings(),
        trackCount: 10,
        search: new Search()
    }, overrides);
}

describe('containers', () => {
    describe('PlaybackBarContainer', () => {
        it('should render PlaybackBar', () => {
            const { playbackBar } = setup(mockProps());

            expect(playbackBar).to.have.length(1);
        });

        it('should call action toggleMinimize with right args when click on `minimize`', () => {
            const props = mockProps();
            const { component, handlers } = setup(props);
            const instance = component.instance();

            instance._handleMinimizeClick();

            expect(handlers.toggleMinimize).to.have.callCount(1);
            expect(handlers.toggleMinimize).to.be.calledWith(props.settings.minimize);
        });

        it('should call action playTrack when click on `play` and there are tracks', () => {
            const props = mockProps();
            const { component, handlers } = setup(props);
            const instance = component.instance();

            instance._handlePlayClick();

            expect(handlers.playTrack).to.have.callCount(1);
        });

        it('should call action loadTracks when click on `play` and there are no tracks', () => {
            const props = mockProps({ trackCount: 0 });
            const { component, handlers } = setup(props);
            const instance = component.instance();

            instance._handlePlayClick();

            expect(handlers.loadTracks).to.have.callCount(1);
        });

        it('should call action prevTrack when click on `prev` and there are tracks', () => {
            const props = mockProps();
            const { component, handlers } = setup(props);
            const instance = component.instance();

            instance._handlePrevClick();

            expect(handlers.prevTrack).to.have.callCount(1);
        });

        it('should not call action prevTrack when click on `prev` and there are no tracks', () => {
            const props = mockProps({ trackCount: 0 });
            const { component, handlers } = setup(props);
            const instance = component.instance();

            instance._handlePrevClick();

            expect(handlers.prevTrack).to.have.callCount(0);
        });

        it('should call action nextTrack when click on `next` and there are tracks', () => {
            const props = mockProps();
            const { component, handlers } = setup(props);
            const instance = component.instance();

            instance._handleNextClick();

            expect(handlers.nextTrack).to.have.callCount(1);
        });

        it('should not call action nextTrack when click on `next` and there are no tracks', () => {
            const props = mockProps({ trackCount: 0 });
            const { component, handlers } = setup(props);
            const instance = component.instance();

            instance._handleNextClick();

            expect(handlers.nextTrack).to.have.callCount(0);
        });

        describe('click on `search` ->', () => {
            beforeEach(function() {
                this.sinon.stub(_, 'delay', function(cb) {
                    cb();
                });
            });

            it('should call action toggleMinimize when minimize is true', () => {
                const props = mockProps({
                    settings: new Settings({ minimize: true })
                });
                const { component, handlers } = setup(props);
                const instance = component.instance();

                instance._handleSearchClick();

                expect(handlers.toggleMinimize).to.have.callCount(1);
                expect(handlers.toggleMinimize).to.be.calledWith(props.settings.minimize);
            });

            it('should not call action toggleMinimize when minimize is false', () => {
                const props = mockProps();
                const { component, handlers } = setup(props);
                const instance = component.instance();

                instance._handleSearchClick();

                expect(handlers.toggleMinimize).to.have.callCount(0);
            });

            it('should call action showSearch when search is hidden', () => {
                const props = mockProps();
                const { component, handlers } = setup(props);
                const instance = component.instance();

                instance._handleSearchClick();

                expect(handlers.showSearch).to.have.callCount(1);
            });

            it('should call action hideSearch when search is visible', () => {
                const props = mockProps({
                    search: new Search({ isShowed: true })
                });
                const { component, handlers } = setup(props);
                const instance = component.instance();

                instance._handleSearchClick();

                expect(handlers.hideSearch).to.have.callCount(1);
            });
        });
    });
});
