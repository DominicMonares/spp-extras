import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { Expansion, Faction } from 'types';

export type Channels = 'account-wide';
export type Callback = (...args: unknown[]) => void;

const electronHandler = {
  ipcRenderer: {
    sendMessage: (channel: Channels, ...args: unknown[]) => {
      ipcRenderer.send(channel, ...args);
    },
    on: (channel: Channels, func: Callback) => {
      const listeners = ipcRenderer.rawListeners('account-wide');
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => func(...args);
      listeners.forEach(listener => {
        const listenerExists = listener.toString() === subscription.toString();
        if (listenerExists) ipcRenderer.removeListener(channel, listener as Callback);
      });

      ipcRenderer.on(channel, subscription);
      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once: (channel: Channels, func: Callback) => {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  questTracker: async (xpac: Expansion) => {
    return ipcRenderer.invoke('questTracker', xpac);
  },
  getExpansion: async () => {
    return ipcRenderer.invoke('get:expansion');
  },
  setExpansion: async (expansion: Expansion) => {
    return ipcRenderer.invoke('set:expansion', expansion);
  },
  getFaction: async () => {
    return ipcRenderer.invoke('get:faction');
  },
  setFaction: async (faction: Faction) => {
    return ipcRenderer.invoke('set:faction', faction);
  }
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
