import uuid from 'node-uuid';

export default function(file, metadata) {
    return {
        id: uuid.v1(),
        src: file,
        album: metadata.album,
        artist: metadata.artist[0],
        title: metadata.title,
        duration: metadata.duration
    };
}
