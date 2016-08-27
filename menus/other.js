const electron = require('electron');

module.exports = function() {
    return [
        {
            label: 'Help',
            submenu: [
                {
                    label: 'Repository',
                    click: () => electron.shell.openExternal('https://github.com/fresk-nc/VOX')
                }
            ]
        }
    ];
};
