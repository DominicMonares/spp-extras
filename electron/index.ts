import { app, BrowserWindow, ipcMain } from 'electron';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import kill from 'tree-kill';
import store from './store'
import { Expansion, Faction } from '../client/types';


// This allows TypeScript to pick up constants auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) app.quit();

// Handle user setting store
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

// Handle server startup
let DJANGO_CHILD_PROCESS: ChildProcessWithoutNullStreams = null;
const spawnDjango = () => {
  if (isDevelopmentEnv()) {
    return spawn(
      `api\\spp_extras_env\\Scripts\\python.exe`,
      ['api\\src\\manage.py', 'runserver', '--settings=spp_extras.settings.dev'],
      { shell: true }
    );
  }

  return spawn(
    `cd api && spp_extras_api.exe runserver 80 --settings=spp_extras.settings.prod --noreload`,
    { shell: true }
  );
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

// Used for origin headers
const upsertKeyValue = (obj: any, keyToChange: string, value: string[]) => {
  const keyToChangeLower = keyToChange.toLowerCase();
  for (const key of Object.keys(obj)) {
    if (key.toLowerCase() === keyToChangeLower) {
      // Reassign old key
      return obj[key] = value;
    }
  }

  // Insert at end instead
  obj[keyToChange] = value;
}

const isDevelopmentEnv = () => {
  console.log(`NODE_ENV=${process.env.NODE_ENV}`)
  return process.env.NODE_ENV === 'development'
}

const openDevTools = (mainWindow: BrowserWindow) => {
  if (isDevelopmentEnv()) {
    mainWindow.webContents.openDevTools();
  }
}

// Handle application startup
const createWindows = async () => {
  startDjangoServer();

  // Create the primary window
  const mainWindow = new BrowserWindow({
    width: 1080,
    minWidth: 794,
    height: 1080,
    minHeight: 540,
    show: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      contextIsolation: true
    }
  });

  // Create the splash window
  const splash = new BrowserWindow({
    width: 500,
    height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      images: true
    }
  });

  mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      const { requestHeaders } = details;
      upsertKeyValue(requestHeaders, 'Access-Control-Allow-Origin', ['*']);
      callback({ requestHeaders });
    },
  );

  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    const { responseHeaders } = details;
    upsertKeyValue(responseHeaders, 'Access-Control-Allow-Origin', ['*']);
    upsertKeyValue(responseHeaders, 'Access-Control-Allow-Headers', ['*']);
    callback({ responseHeaders });
  });

  // Display splash window while app is loading
  splash.loadFile('electron/splash.html');
  splash.center();

  // Load the index.html of the app
  await mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Close the splash and display main window
  splash.close();

  if (!isDevelopmentEnv()) mainWindow.setMenu(null);
  mainWindow.setMenu(null);
  mainWindow.show();

  // Open the DevTools
  if (isDevelopmentEnv()) openDevTools(mainWindow);
};

app.on('ready', createWindows);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  // Kill python process when the window is closed
  kill(DJANGO_CHILD_PROCESS.pid);
  kill(process.pid);
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindows();
  }
});
