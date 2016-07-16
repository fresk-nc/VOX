import uuid from 'node-uuid';
import mediaFileLoader from 'lib/mediaFileLoader';

describe('libs', () => {
    describe('mediaFileLoader', () => {
        describe('#load', () => {
            beforeEach(function() {
                this.sinon.stub(uuid, 'v1').returns('id');
                this.sinon.stub(mediaFileLoader, '_getStats').returns(Promise.resolve({
                    isDirectory() { return false; },
                    isFile() { return true; }
                }));

                this.sinon.stub(mediaFileLoader, 'loadFile').returns(Promise.resolve({ title: 'title 1' }));
                this.sinon.stub(mediaFileLoader, 'loadFolder').returns(Promise.resolve([
                    { title: 'title 2' },
                    { title: 'title 3' }
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
                        { id: 'id', title: 'title 1' }
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
                        { id: 'id', title: 'title 2' },
                        { id: 'id', title: 'title 3' }
                    ]);
                });
            });
        });
    });
});
