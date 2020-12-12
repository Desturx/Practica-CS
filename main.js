const { BrowserWindow, app } = require('electron')
require('./src/index.js')
var indexModule = require('./src/index');
let mainWindow = null

function main() {
  mainWindow = new BrowserWindow();
  mainWindow.removeMenu();
  mainWindow.loadURL(`http://localhost:`+ indexModule.finalPort +`/`)
  mainWindow.on('close', event => {
    mainWindow = null
  })
}

app.on('ready', main)
