// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  questTracker: async (xpac: any, bots: boolean) => { // TEMP TYPE
    return ipcRenderer.invoke('questTracker', xpac);
  },
  getExpansion: async () => {
    return ipcRenderer.invoke('get:expansion');
  },
  setExpansion: async (expansion: string) => { // TEMP TYPE
    return ipcRenderer.invoke('set:expansion', expansion);
  },
  getFaction: async () => {
    return ipcRenderer.invoke('get:faction');
  },
  setFaction: async (faction: string) => { // TEMP TYPE
    return ipcRenderer.invoke('set:faction', faction);
  }
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
