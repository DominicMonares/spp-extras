/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { URL } from 'url';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import MenuBuilder from './menu';
import store from './store';
import accountWide from './services/accountWide';
import questTracker from './services/questTracker';
import { Expansion, Faction } from '../types';

let mainWindow: BrowserWindow | null = null;
let splashWindow: BrowserWindow | null = null;

// Handle account-wide service
ipcMain.on('account-wide', async (event, settings) => {
  await accountWide(settings, event.reply);
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDev = process.env.NODE_ENV === 'development';
const isDebug = process.env.DEBUG_PROD === 'true';

if (isDev || isDebug) require('electron-debug')();

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  splashWindow = new BrowserWindow({
    width: 500,
    height: 300,
    transparent: true,
    frame: false,
    center: true,
    webPreferences: {
      images: true,
      devTools: false,
    }
  });

  // Display splash window while app is loading
  const splashHTMLPath = `${path.resolve(__dirname, '../renderer/', 'splash.html')}`;
  splashWindow.loadFile(splashHTMLPath);

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    minWidth: 794,
    height: 800,
    minHeight: 670,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  let htmlPath: string;
  if (isDev) {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = 'index.html';
    htmlPath = url.href;
  } else {
    htmlPath = `file://${path.resolve(__dirname, '../renderer/', 'index.html')}`;
  }

  // Load the index.html of the app
  mainWindow.loadURL(htmlPath);

  mainWindow.on('ready-to-show', () => {
    // Close the splash and display main window
    splashWindow?.close();
    splashWindow = null;
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      // mainWindow.center();
      mainWindow.show();
      mainWindow.setSize(800, 800);
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    ipcMain.handle('questTracker', async (e, xpac: Expansion) => questTracker(xpac));
    ipcMain.handle('get:expansion', async () => store.get('expansion'));
    ipcMain.handle('set:expansion', async (e, xpac: Expansion) => {
      return store.set('expansion', xpac);
    });
    ipcMain.handle('get:faction', async () =>store.get('faction'));
    ipcMain.handle('set:faction', async (e, faction: Faction) => {
      return store.set('faction', faction);
    });

    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
