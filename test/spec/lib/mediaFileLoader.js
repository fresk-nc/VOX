import mediaFileLoader from 'lib/mediaFileLoader';

describe('libs', () => {
    describe('mediaFileLoader', () => {
        describe('#load', () => {
            beforeEach(function() {
                this.sinon.stub(mediaFileLoader, '_getStats').returns(Promise.resolve({
                    isDirectory() { return false; },
                    isFile() { return true; }
                }));

                this.sinon.stub(mediaFileLoader, 'loadFile').returns(Promise.resolve({ id: '111' }));
                this.sinon.stub(mediaFileLoader, 'loadFolder').returns(Promise.resolve([
                    { id: '111' },
                    { id: '112' }
                ]));
            });

            it('should return empty array when there are no files', function() {
                return mediaFileLoader.load().then((result) => {
                    expect(result).to.be.eql([]);
                });
            });

            it('should handle file', function() {
                return mediaFileLoader.load([ 'test.mp3' ]).then((result) => {
                    expect(mediaFileLoader.loadFile).to.have.callCount(1);
                    expect(mediaFileLoader.loadFolder).to.have.callCount(0);
                    expect(result).to.be.eql([
                        { id: '111' }
                    ]);
                });
            });

            it('should handle folder', function() {
                mediaFileLoader._getStats.returns(Promise.resolve({
                    isDirectory() { return true; },
                    isFile() { return false; }
                }));

                return mediaFileLoader.load([ 'folder' ]).then((result) => {
                    expect(mediaFileLoader.loadFile).to.have.callCount(0);
                    expect(mediaFileLoader.loadFolder).to.have.callCount(1);
                    expect(result).to.be.eql([
                        { id: '111' },
                        { id: '112' }
                    ]);
                });
            });
        });
    });
});
