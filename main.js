const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const crashReporter = electron.crashReporter;
const isDev = (process.env.NODE_ENV === 'development');

let mainWindow = null;

crashReporter.start();

if (isDev) {
    require('electron-debug')();
}

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 320,
        height: 570,
        show: false,
        resizable: isDev,
        backgroundColor: '#282828',
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
