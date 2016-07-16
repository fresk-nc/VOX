import mediaDoctor from 'lib/mediaDoctor';

describe('libs', () => {
    describe('mediaDoctor', () => {
        it('should normalize metadata', () => {
            const file = 'my_music/test.mp3';
            const metadata = {
                album: 'Album',
                artist: [ 'Artist' ],
                title: 'Title',
                duration: 222,
                picture: [
                    {
                        data: [],
                        format: 'png'
                    }
                ]
            };

            expect(mediaDoctor(file, metadata)).to.be.deep.equal({
                src: file,
                album: metadata.album,
                artist: metadata.artist[0],
                title: metadata.title,
                duration: metadata.duration,
                picture: []
            });
        });
    });
});
