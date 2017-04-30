import electron = require("electron");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow: Electron.BrowserWindow = null;

function createWindow() {
    mainWindow = new Electron.BrowserWindow({width: 800, height: 600});
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
    mainWindow.webContents.openDevTools();
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
