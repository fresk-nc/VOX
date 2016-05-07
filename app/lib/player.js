import { shuffle } from 'lodash';

class Player {

    constructor() {
        this._list = [];
        this._noShuffleList = [];
        this._events = {};
        this._currentTrack = null;
        this._shuffle = false;

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
            const newTrack = { id: track.id, src: track.src };

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
        const currentIndex = Math.max(this._list.indexOf(this._currentTrack), 0);
        const index = (currentIndex === this._list.length - 1) ? 0 : currentIndex + 1;
        const id = this._list[index].id;

        this.play(id);
    }

    prev() {
        const currentIndex = Math.max(this._list.indexOf(this._currentTrack), 0);
        const index = (currentIndex === 0) ? this._list.length - 1 : currentIndex - 1;
        const id = this._list[index].id;

        this.play(id);
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

}

export default new Player();
