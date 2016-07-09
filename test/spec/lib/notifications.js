import notifications from 'lib/notifications';
import coverLoader from 'lib/coverLoader';

describe('lib', () => {
    describe('notifications', () => {
        describe('nextTrack', () => {
            beforeEach(function() {
                this.sinon.stub(notifications, '_hasFocusedWindow');
                this.sinon.stub(notifications, '_showNotification');
                this.sinon.stub(coverLoader, 'load').returns({
                    then(cb) {
                        cb('icon');
                    }
                });
                this.track = {
                    title: 'test',
                    artist: 'test',
                    album: 'test'
                };
            });

            it('should not show notification when there is no the next track', function() {
                notifications.nextTrack();

                expect(notifications._showNotification).to.have.callCount(0);
            });

            it('should not show notification when has focus on window', function() {
                notifications._hasFocusedWindow.returns(true);
                notifications.nextTrack(this.track);

                expect(notifications._showNotification).to.have.callCount(0);
            });

            it('should show notification in other cases', function() {
                notifications._hasFocusedWindow.returns(false);
                notifications.nextTrack(this.track);

                expect(notifications._showNotification).to.have.callCount(1);
                expect(notifications._showNotification).to.be.calledWith(this.track.title, {
                    body: `${this.track.artist} — ${this.track.album}`,
                    silent: true,
                    icon: 'icon'
                });
            });
        });
    });
});
