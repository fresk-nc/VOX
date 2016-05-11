import { shuffle } from 'lodash';

class Player {

    constructor() {
        this._list = [];
        this._noShuffleList = [];
        this._events = {};
        this._currentTrack = null;
        this._shuffle = false;
        this._loopMode = 'off';

        this._init();
    }

    _init() {
        this[0] = new Audio();
        this._bindAudioEvents();
    }

    _bindAudioEvents() {
        this[0].addEventListener('ended', () => {
            this.trigger('ended');
        }, false);

        this[0].addEventListener('timeupdate', () => {
            this.trigger('timeupdate', this[0].currentTime, this.getProgress());
        }, false);
    }

    addTracks(tracks) {
        const newTracks = [];

        tracks.forEach((track) => {
            const newTrack = {
                id: track.id,
                src: track.src,
                title: track.title,
                album: track.album,
                artist: track.artist
            };

            newTracks.push(newTrack);

            if (track.isCurrent) {
                this._currentTrack = newTrack;
            }
        });

        this._list = this._list.concat(newTracks);
        this._noShuffleList = this._noShuffleList.concat(newTracks);

        if (this._shuffle) {
            this._shuffleTracks();
        }
    }

    removeTrack(id) {
        this._list = this._list.filter((track) => track.id !== id);
        this._noShuffleList = this._noShuffleList.filter((track) => track.id !== id);

        if (this._currentTrack && this._currentTrack.id === id) {
            this._currentTrack = null;
            this.pause();
        }
    }

    play(id) {
        if (id) {
            this._updateCurrentTrack(
                this._list.find((track) => track.id === id)
            );
            this._updateSrc();
            this._play();
            return;
        }

        if (!id && !this._currentTrack) {
            this._updateCurrentTrack(this._list[0]);
            this._updateSrc();
            this._play();
            return;
        }

        if (!id && this._currentTrack) {
            if (!this[0].src) {
                this._updateSrc();
            }
            this._play();
        }
    }

    _updateCurrentTrack(track) {
        this._currentTrack = track;
    }

    _updateSrc() {
        this[0].src = 'file:///' + this._currentTrack.src;
    }

    _play() {
        this[0].play();
    }

    pause() {
        this[0].pause();
    }

    next() {
        const index = this._getNextTrackIndex();

        if (index > -1) {
            this.play(this._list[index].id);
        } else {
            this._currentTrack = null;
            this.pause();
        }
    }

    _getNextTrackIndex() {
        const currentIndex = this._list.indexOf(this._currentTrack);

        if (currentIndex === -1) {
            return 0;
        }

        if (this._loopMode === 'one') {
            return currentIndex;
        }

        if (this._loopMode === 'all') {
            return (currentIndex === this._list.length - 1) ? 0 : currentIndex + 1;
        }

        return (currentIndex === this._list.length - 1) ? -1 : currentIndex + 1;
    }

    prev() {
        const index = this._getPrevTrackIndex();

        if (index > -1) {
            this.play(this._list[index].id);
        } else {
            this._currentTrack = null;
            this.pause();
        }
    }

    _getPrevTrackIndex() {
        const currentIndex = this._list.indexOf(this._currentTrack);

        if (currentIndex === -1) {
            return this._list.length - 1;
        }

        if (this._loopMode === 'one') {
            return currentIndex;
        }

        if (this._loopMode === 'all') {
            return (currentIndex === 0) ? this._list.length - 1 : currentIndex - 1;
        }

        return (currentIndex === 0) ? -1 : currentIndex - 1;
    }

    getCurrentTrack() {
        return this._currentTrack;
    }

    getCurrentTrackId() {
        return this._currentTrack && this._currentTrack.id;
    }

    on(eventName, method) {
        this._events[eventName] || (this._events[eventName] = []);
        this._events[eventName].push(method);
    }

    trigger(eventName, ...payload) {
        const methods = this._events[eventName];

        if (!methods) {
            return;
        }

        methods.forEach((method) => {
            method(...payload);
        });
    }

    clearTrackList() {
        this._list = [];
        this._noShuffleList = [];
        this._currentTrack = null;
    }

    getProgress() {
        return (this[0].currentTime / this[0].duration * 100) || 0;
    }

    setProgress(time) {
        this[0].currentTime = time;
    }

    shuffleOn() {
        this._shuffle = true;
        this._shuffleTracks();
    }

    shuffleOff() {
        this._shuffle = false;
        this._list = [].concat(this._noShuffleList);
    }

    _shuffleTracks() {
        if (this._list.length) {
            this._list = shuffle(this._list);
        }
    }

    changeLoopMode(mode) {
        this._loopMode = mode;
    }

    changeVolume(volume) {
        this[0].volume = volume;
    }

}

export default new Player();
