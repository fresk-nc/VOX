import uuid from 'node-uuid';

export function normalize(file, metadata) {
    return {
        id: uuid.v1(),
        src: file,
        album: metadata.album,
        artist: metadata.artist[0],
        title: metadata.title,
        duration: metadata.duration,
        isPlay: false,
        isCurrent: false
    };
}
