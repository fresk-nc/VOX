class Player {

    constructor() {
        this._list = [];
        this._events = {};
        this._index = 0;
        this._currentTrack = null;

        this._init();
    }

    _init() {
        this[0] = new Audio();
        this._bindAudioEvents();
    }

    _bindAudioEvents() {
        this[0].addEventListener('ended', () => {
            //this.next();
        }, false);

        this[0].addEventListener('timeupdate', () => {
            this.trigger('timeupdate', this[0].currentTime, this.getProgress());
        }, false);
    }

    addTracks(tracks) {
        tracks.forEach((track) => {
            this._list.push({
                id: track.id,
                src: track.src
            });
        });
    }

    play(id) {
        // FIXME
        if (id) {
            let track;

            for (let i = 0; i < this._list.length; i++) {
                track = this._list[i];

                if (track.id === id) {
                    this._index = i;
                    this._currentTrack = track;
                    break;
                }
            }

            this[0].src = 'file:///' + track.src;
            this[0].play();
            return;
        }

        if (!id && !this._currentTrack) {
            let track = this._list[0];

            this._currentTrack = track;
            this._index = 0;
            this[0].src = 'file:///' + track.src;
            this[0].play();
            return;
        }

        if (!id && this._currentTrack) {
            this[0].play();
        }
    }

    pause() {
        this[0].pause();
    }

    next() {
        const index = (this._index === this._list.length - 1) ? 0 : this._index + 1;
        const id = this._list[index].id;

        this.play(id);
    }

    prev() {
        const index = (this._index === 0) ? this._list.length - 1 : this._index - 1;
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

    off() {

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
        this._index = 0;
        this._currentTrack = null;
    }

    getProgress() {
        return (this[0].currentTime / this[0].duration * 100) || 0;
    }

    setProgress(time) {
        this[0].currentTime = time;
    }

}

export default new Player();
