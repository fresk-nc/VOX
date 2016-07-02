const electron = require('electron');
const JSONStorage = require('node-localstorage').JSONStorage;
const config = require('./app/config');
const darwinTemplate = require('./menus/darwin');

const app = electron.app;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;
const isDev = (process.env.NODE_ENV === 'development');

let mainWindow = null;
let menu = null;

require('electron-debug')();

function installExtensions() {
    const installer = require('electron-devtools-installer');
    const extensions = [
        'REACT_DEVELOPER_TOOLS'
    ];

    extensions.forEach((extension) => {
        installer.default(installer[extension]);
    });
}

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    if (isDev) {
        installExtensions();
    }

    const storage = new JSONStorage(isDev ? config.devUserData : app.getPath('userData'));
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

    menu = Menu.buildFromTemplate(darwinTemplate());
    Menu.setApplicationMenu(menu);

    mainWindow.loadURL(`file://${__dirname}/app/app.html`);

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show();
        mainWindow.focus();
    });

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
