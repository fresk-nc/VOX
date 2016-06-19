import { PlaybackContainer } from 'containers/PlaybackContainer';
import Playback from 'components/Playback';
import player from 'lib/player';
import { shallow } from 'enzyme';
import Track from 'records/Track';

function setup(props) {
    const handlers = {
        nextTrack: sinon.spy(),
        reportPlayerError: sinon.spy()
    };
    const component = shallow(
        <PlaybackContainer {...props} {...handlers} />
    );

    return {
        handlers,
        component
    };
}

function mockProps(overrides) {
    return Object.assign({}, {
        currentTrack: new Track({
            id: '100',
            title: 'title',
            artist: 'artist',
            album: 'album',
            duration: 220
        })
    }, overrides);
}

describe('containers', () => {
    describe('PlaybackContainer', () => {
        it('should render the Playback component', () => {
            const { component } = setup(mockProps());

            expect(component.find(Playback)).to.have.length(1);
        });

        describe('timeupdate event ->', () => {
            it('should update the current time and progress', () => {
                const { component } = setup(mockProps());
                const newCurrentTime = 110;
                const newProgress = 50;

                component.setState({ isChangingTime: false });
                component.instance()._onTimeUpdate(newCurrentTime, newProgress);

                expect(component.state('currentTime')).to.be.equal(newCurrentTime);
                expect(component.state('progress')).to.be.equal(newProgress);
            });

            it('should not update the current time and progress when time is changing', () => {
                const { component } = setup(mockProps());
                const newCurrentTime = 110;
                const newProgress = 50;

                component.setState({
                    isChangingTime: true,
                    currentTime: 0,
                    progress: 0
                });
                component.instance()._onTimeUpdate(newCurrentTime, newProgress);

                expect(component.state('currentTime')).to.be.equal(0);
                expect(component.state('progress')).to.be.equal(0);
            });
        });

        describe('ended event ->', () => {
            it('should reset the current time', () => {
                const { component } = setup(mockProps());

                component.setState({ currentTime: 220 });
                component.instance()._onTrackEnded();

                expect(component.state('currentTime')).to.be.equal(0);

            });

            it('should switch on the next track', () => {
                const { component, handlers } = setup(mockProps());

                component.instance()._onTrackEnded();

                expect(handlers.nextTrack).to.have.callCount(1);
            });
        });

        describe('error event ->', () => {
            it('should report error with right args', () => {
                const mock = mockProps();
                const { component, handlers } = setup(mock);

                component.instance()._onPlayerError();

                expect(handlers.reportPlayerError).to.have.callCount(1);
                expect(handlers.reportPlayerError).to.be.calledWith(
                    mock.currentTrack.src,
                    mock.currentTrack.id
                );
            });
        });

        describe('window mouse move ->', () => {
            beforeEach(function() {
                this.sinon.stub(window, 'outerWidth', 320);
            });

            it('should reset progress and time when the cursor over the left edge of the window', () => {
                const { component } = setup(mockProps());

                component.setState({ currentTime: 110, progress: 50 });
                component.instance()._handleWindowMouseMove({ clientX: -100 });

                expect(component.state('currentTime')).to.be.equal(0);
                expect(component.state('progress')).to.be.equal(0);
            });

            it('should set the maximum value of time and progress when the cursor over the right edge of the window', () => {
                const { component } = setup(mockProps());

                component.setState({ currentTime: 110, progress: 50 });
                component.instance()._handleWindowMouseMove({ clientX: 500 });

                expect(component.state('currentTime')).to.be.equal(220);
                expect(component.state('progress')).to.be.equal(100);
            });

            it('should set the actual value of time and progress when cursor within the window', () => {
                const { component } = setup(mockProps());

                component.setState({ currentTime: 0, progress: 0 });
                component.instance()._handleWindowMouseMove({ clientX: 160 });

                expect(component.state('currentTime')).to.be.equal(110);
                expect(component.state('progress')).to.be.equal(50);
            });
        });

        describe('click on the progress line ->', () => {
            beforeEach(function() {
                this.sinon.stub(window, 'outerWidth', 320);
                this.sinon.stub(player, 'setProgress');
            });

            it('should set the actual value of time and progress when clicked on progress line', () => {
                const { component } = setup(mockProps());

                component.setState({ currentTime: 0, progress: 0 });
                component.instance()._handleProgressClick({ clientX: 160 });

                expect(component.state('currentTime')).to.be.equal(110);
                expect(component.state('progress')).to.be.equal(50);
            });

            it('should update the player progress when clicked on progress line', () => {
                const { component } = setup(mockProps());

                component.setState({ currentTime: 0, progress: 0 });
                component.instance()._handleProgressClick({ clientX: 160 });

                expect(player.setProgress).to.have.callCount(1);
                expect(player.setProgress).to.be.calledWith(110);
            });
        });

        describe('mouse down on the progress line ->', () => {
            beforeEach(function() {
                this.sinon.stub(window, 'addEventListener');
            });

            it('should add event listener `mousemove` on window when mouse down on progress line', () => {
                const { component } = setup(mockProps());

                component.instance()._handleProgressMouseDown();

                expect(window.addEventListener).to.be.calledWith('mousemove');
            });

            it('should add event listener `mouseup` on window when mouse down on progress line', () => {
                const { component } = setup(mockProps());

                component.instance()._handleProgressMouseDown();

                expect(window.addEventListener).to.be.calledWith('mouseup');
            });

            it('should set the flag `isChangingTime` when mouse down on progress line', () => {
                const { component } = setup(mockProps());

                expect(component.state('isChangingTime')).to.be.equal(false);

                component.instance()._handleProgressMouseDown();

                expect(component.state('isChangingTime')).to.be.equal(true);
            });
        });

        describe('window mouse up ->', () => {
            beforeEach(function() {
                this.sinon.stub(window, 'removeEventListener');
                this.sinon.stub(player, 'setProgress');
            });

            it('should remove event listener `mousemove` when mouse up on window', () => {
                const { component } = setup(mockProps());

                component.instance()._handleWindowMouseUp();

                expect(window.removeEventListener).to.be.calledWith('mousemove');
            });

            it('should remove event listener `mouseup` when mouse up on window', () => {
                const { component } = setup(mockProps());

                component.instance()._handleWindowMouseUp();

                expect(window.removeEventListener).to.be.calledWith('mouseup');
            });

            it('should reset the flag `isChangingTime` when mouse up on window', () => {
                const { component } = setup(mockProps());

                component.setState({ isChangingTime: true });
                component.instance()._handleWindowMouseUp();

                expect(component.state('isChangingTime')).to.be.equal(false);
            });

            it('should update the player progress when mouse up on window', function() {
                const { component } = setup(mockProps());

                component.instance()._handleWindowMouseUp();

                expect(player.setProgress).to.have.callCount(1);
                expect(player.setProgress).to.be.calledWith(
                    component.state('currentTime')
                );
            });
        });
    });
});
