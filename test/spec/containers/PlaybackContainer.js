import { PlaybackContainer } from 'containers/PlaybackContainer';
import Playback from 'components/Playback';
import player from 'lib/player';
import { mount } from 'enzyme';
import { Map } from 'immutable';

function setup(props) {
    const handlers = {
        nextTrack: sinon.spy(),
        reportPlayerError: sinon.spy()
    };
    const container = mount(
        <PlaybackContainer {...props} {...handlers} />
    );

    return {
        handlers,
        container
    };
}

describe('containers', () => {
    describe('PlaybackContainer', () => {
        beforeEach(function() {
            this.sinon.stub(player, 'on');
        });

        it('should render the Playback component', () => {
            const { container } = setup();

            expect(container.find(Playback)).to.have.length(1);
        });

        describe('_onTimeUpdate', () => {
            beforeEach(function() {
                this.mockContext = {
                    setState: this.sinon.spy(),
                    state: {
                        isChangingTime: false
                    }
                };
            });

            it('should update the current time and progress', function() {
                PlaybackContainer.prototype._onTimeUpdate.call(this.mockContext, 110, 50);

                expect(this.mockContext.setState).to.have.callCount(1);
                expect(this.mockContext.setState).to.be.calledWith({
                    currentTime: 110,
                    progress: 50
                });
            });

            it('should not update the current time and progress when time is changing', function() {
                this.mockContext.state.isChangingTime = true;

                PlaybackContainer.prototype._onTimeUpdate.call(this.mockContext, 110, 50);

                expect(this.mockContext.setState).to.have.callCount(0);
            });
        });

        describe('_onTrackEnded', () => {
            beforeEach(function() {
                this.mockContext = {
                    setState: this.sinon.spy(),
                    props: {
                        nextTrack: this.sinon.spy()
                    }
                };
            });

            it('should reset the current time', function() {
                PlaybackContainer.prototype._onTrackEnded.call(this.mockContext);

                expect(this.mockContext.setState).to.have.callCount(1);
                expect(this.mockContext.setState).to.be.calledWith({
                    currentTime: 0
                });
            });

            it('should switch on the next track', function() {
                PlaybackContainer.prototype._onTrackEnded.call(this.mockContext);

                expect(this.mockContext.props.nextTrack).to.have.callCount(1);
            });
        });

        describe('_onPlayerError', () => {
            beforeEach(function() {
                this.mockContext = {
                    props: {
                        reportPlayerError: this.sinon.spy(),
                        currentTrack: Map({
                            id: 100,
                            src: 'src'
                        })
                    }
                };
            });

            it('should report error', function() {
                PlaybackContainer.prototype._onPlayerError.call(this.mockContext);

                expect(this.mockContext.props.reportPlayerError).to.have.callCount(1);
                expect(this.mockContext.props.reportPlayerError).to.be.calledWith(
                    this.mockContext.props.currentTrack.get('src'),
                    this.mockContext.props.currentTrack.get('id')
                );
            });
        });

        describe('_handleWindowMouseMove', () => {
            beforeEach(function() {
                this.sinon.stub(window, 'outerWidth', 320);
                this.mockContext = {
                    setState: this.sinon.spy(),
                    props: {
                        currentTrack: Map({
                            duration: 220
                        })
                    }
                };
            });

            it('should reset progress and time when the cursor over the left edge of the window', function() {
                PlaybackContainer.prototype._handleWindowMouseMove.call(this.mockContext, {
                    clientX: -100
                });

                expect(this.mockContext.setState).to.have.callCount(1);
                expect(this.mockContext.setState).to.be.calledWith({
                    currentTime: 0,
                    progress: 0
                });
            });

            it('should set the maximum value of time and progress when the cursor over the right edge of the window', function() {
                PlaybackContainer.prototype._handleWindowMouseMove.call(this.mockContext, {
                    clientX: 500
                });

                expect(this.mockContext.setState).to.have.callCount(1);
                expect(this.mockContext.setState).to.be.calledWith({
                    currentTime: 220,
                    progress: 100
                });
            });

            it('should set the actual value of time and progress when cursor within the window', function() {
                PlaybackContainer.prototype._handleWindowMouseMove.call(this.mockContext, {
                    clientX: 160
                });

                expect(this.mockContext.setState).to.have.callCount(1);
                expect(this.mockContext.setState).to.be.calledWith({
                    currentTime: 110,
                    progress: 50
                });
            });
        });

        describe('_handleProgressClick', () => {
            beforeEach(function() {
                this.sinon.stub(window, 'outerWidth', 320);
                this.mockContext = {
                    setState: this.sinon.spy(),
                    props: {
                        currentTrack: Map({
                            duration: 220
                        })
                    }
                };
                this.sinon.stub(player, 'setProgress');
            });

            it('should set the actual value of time and progress when clicked on progress line', function() {
                PlaybackContainer.prototype._handleProgressClick.call(this.mockContext, {
                    clientX: 160
                });

                expect(this.mockContext.setState).to.have.callCount(1);
                expect(this.mockContext.setState).to.be.calledWith({
                    currentTime: 110,
                    progress: 50
                });
            });

            it('should update the player progress when clicked on progress line', function() {
                PlaybackContainer.prototype._handleProgressClick.call(this.mockContext, {
                    clientX: 160
                });

                expect(player.setProgress).to.have.callCount(1);
                expect(player.setProgress).to.be.calledWith(110);
            });
        });

        describe('_handleProgressMouseDown', () => {
            beforeEach(function() {
                this.sinon.stub(window, 'addEventListener');
                this.mockContext = {
                    setState: this.sinon.spy()
                };
            });

            it('should add event listener `mousemove` on window when mouse down on progress line', function() {
                PlaybackContainer.prototype._handleProgressMouseDown.call(this.mockContext);

                expect(window.addEventListener).to.be.calledWith('mousemove');
            });

            it('should add event listener `mouseup` on window when mouse down on progress line', function() {
                PlaybackContainer.prototype._handleProgressMouseDown.call(this.mockContext);

                expect(window.addEventListener).to.be.calledWith('mouseup');
            });

            it('should set the flag `isChangingTime` when mouse down on progress line', function() {
                PlaybackContainer.prototype._handleProgressMouseDown.call(this.mockContext);

                expect(this.mockContext.setState).to.have.callCount(1);
                expect(this.mockContext.setState).to.be.calledWith({ isChangingTime: true });
            });
        });

        describe('_handleWindowMouseUp', () => {
            beforeEach(function() {
                this.sinon.stub(window, 'removeEventListener');
                this.mockContext = {
                    setState: this.sinon.spy(),
                    state: {
                        currentTime: 200
                    }
                };
                this.sinon.stub(player, 'setProgress');
            });

            it('should remove event listener `mousemove` when mouse up on window', function() {
                PlaybackContainer.prototype._handleWindowMouseUp.call(this.mockContext);

                expect(window.removeEventListener).to.be.calledWith('mousemove');
            });

            it('should remove event listener `mouseup` when mouse up on window', function() {
                PlaybackContainer.prototype._handleWindowMouseUp.call(this.mockContext);

                expect(window.removeEventListener).to.be.calledWith('mouseup');
            });

            it('should reset the flag `isChangingTime` when mouse up on window', function() {
                PlaybackContainer.prototype._handleWindowMouseUp.call(this.mockContext);

                expect(this.mockContext.setState).to.have.callCount(1);
                expect(this.mockContext.setState).to.be.calledWith({ isChangingTime: false });
            });

            it('should update the player progress when mouse up on window', function() {
                PlaybackContainer.prototype._handleWindowMouseUp.call(this.mockContext);

                expect(player.setProgress).to.have.callCount(1);
                expect(player.setProgress).to.be.calledWith(this.mockContext.state.currentTime);
            });
        });
    });
});
