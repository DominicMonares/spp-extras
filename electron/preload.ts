import { contextBridge, ipcRenderer } from 'electron'


contextBridge.exposeInMainWorld('electron', {
  store: {
    get(key: string) {
      return ipcRenderer.sendSync('electron-store-get', key);
    },
    set(property, val) { // TEMP ANY
      ipcRenderer.send('electron-store-set', property, val);
    },
  },
});
