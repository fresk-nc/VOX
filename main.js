import { app, BrowserWindow } from 'electron';
import { JSONStorage } from 'node-localstorage';
import config from './app/config';

const isDev = (process.env.NODE_ENV === 'development');
let mainWindow = null;

if (isDev) {
    require('electron-debug')();
}

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    const storage = new JSONStorage('./state');
    const settings = storage.getItem('reduxPersist:settings');

    let width = config.maxSize.width;
    let height = config.maxSize.height;

    if (settings && settings.minimize) {
        width = config.minSize.width;
        height = config.minSize.height;
    }

    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        show: false,
        resizable: isDev,
        backgroundColor: config.backgroundColor,
        fullscreen: false,
        frame: false
    });

    mainWindow.loadURL(`file://${__dirname}/app/app.html`);

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show();
        mainWindow.focus();
    });

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
