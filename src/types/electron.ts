import { IpcMainEvent } from 'electron';

// ----------------------------------------------------------------
// Functions
// ----------------------------------------------------------------

export type Channels = 'account-wide';

export type ElectronCallback = (...args: unknown[]) => void;

export type Reply = IpcMainEvent['reply'];
