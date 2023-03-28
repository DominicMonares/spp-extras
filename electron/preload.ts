import { contextBridge, ipcRenderer } from 'electron';
import { Expansion, Faction } from '../client/types';


contextBridge.exposeInMainWorld('electron', {
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
})
