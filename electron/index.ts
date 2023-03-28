import { app, BrowserWindow, ipcMain } from 'electron';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import kill from 'tree-kill';
import store from './store'
import { Expansion, Faction } from '../client/types';


// Handle user setting store
ipcMain.handle('installed', async () => {
  const expansion = store.get('expansion');
  const faction = store.get('faction');
  return ([expansion, faction]);
});

ipcMain.handle('get:expansion', async () => {
  return store.get('expansion');
});

ipcMain.handle('set:expansion', async (e, expansion: Expansion) => {
  return store.set('expansion', expansion);
});

ipcMain.handle('get:faction', async () => {
  return store.get('faction');
});

ipcMain.handle('set:faction', async (e, faction: Faction) => {
  return store.set('faction', faction);
});

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
let DJANGO_CHILD_PROCESS: ChildProcessWithoutNullStreams = null;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = async () => {
  startDjangoServer();

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1094,
    height: 1080,
    maxWidth: 1094,
    maxHeight: 1094,
    minWidth: 794,
    show: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      contextIsolation: true
    },
  });

  const splash = new BrowserWindow({
    width: 500,
    height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true
  });

  mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      const { requestHeaders } = details;
      UpsertKeyValue(requestHeaders, 'Access-Control-Allow-Origin', ['*']);
      callback({ requestHeaders });
    },
  );

  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    const { responseHeaders } = details;
    UpsertKeyValue(responseHeaders, 'Access-Control-Allow-Origin', ['*']);
    UpsertKeyValue(responseHeaders, 'Access-Control-Allow-Headers', ['*']);
    callback({
      responseHeaders,
    });
  });

  splash.loadFile('electron/splash.html');
  splash.center();

  // Load the index.html of the app
  await mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  splash.close();
  mainWindow.show();

  // Open the DevTools.
  openDevTools(mainWindow);
};

// eslint-disable-next-line
const UpsertKeyValue = (obj: any, keyToChange: string, value: string[]) => {
  const keyToChangeLower = keyToChange.toLowerCase();
  for (const key of Object.keys(obj)) {
    if (key.toLowerCase() === keyToChangeLower) {
      // Reassign old key
      obj[key] = value;
      return;
    }
  }

  // Insert at end instead
  obj[keyToChange] = value;
}

const startDjangoServer = () => {
  DJANGO_CHILD_PROCESS = spawnDjango();
  DJANGO_CHILD_PROCESS.stdout.on('data', data => {
    console.log(`stdout:\n${data}`);
  });

  DJANGO_CHILD_PROCESS.stderr.on('data', data => {
    console.log(`stderr: ${data}`);
  });

  DJANGO_CHILD_PROCESS.on('error', (error) => {
    console.log(`error: ${error.message}`);
  });

  DJANGO_CHILD_PROCESS.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  DJANGO_CHILD_PROCESS.on('message', (message) => {
    console.log(`stdout:\n${message}`);
  });

  return DJANGO_CHILD_PROCESS;
}

const spawnDjango = () => {
  if (isDevelopmentEnv()) {
    return spawn(
      `api\\spp_extras_env\\Scripts\\python.exe`,
      ['api\\src\\manage.py', 'runserver', '--settings=spp_extras.settings.dev'],
      { shell: true }
    );
  }

  return spawn(
    `cd api && spp_extras_api.exe runserver --settings=spp_extras.settings.prod --noreload`,
    { shell: true }
  );
}

const isDevelopmentEnv = () => {
  console.log(`NODE_ENV=${process.env.NODE_ENV}`)
  return process.env.NODE_ENV == 'development'
}

const openDevTools = (mainWindow: BrowserWindow) => {
  if (isDevelopmentEnv()) {
    mainWindow.webContents.openDevTools();
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  // Kill python process when the window is closed
  // Having async issue with killing process, kill callback w/ preventDefault doesn't work
  // This causes the spp_extras_api.exe to continue running after closing app
  // NEEDS FIX FOR PRODUCTION

  kill(DJANGO_CHILD_PROCESS.pid);
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
