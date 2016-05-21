import { LocalStorage } from 'node-localstorage';
import config from 'config';

const { app } = require('electron').remote;

const isDev = (process.env.NODE_ENV === 'development');
const storage = new LocalStorage(isDev ? config.devUserData : app.getPath('userData'));

export default {
    getItem: (key, cb) => {
        try {
            cb(null, storage.getItem(key));
        } catch (e) {
            cb(e);
        }
    },
    setItem: (key, string, cb) => {
        try {
            storage.setItem(key, string);
            cb(null);
        } catch (e) {
            cb(e);
        }
    },
    removeItem: (key, cb) => {
        try {
            storage.removeItem(key);
            cb(null);
        } catch (e) {
            cb(e);
        }
    },
    getAllKeys: (cb) => {
        try {
            const keys = [];
            for (var i = 0; i < storage.length; i++) {
                keys.push(storage.key(i));
            }
            cb(null, keys);
        } catch (e) {
            cb(e);
        }
    }
};
