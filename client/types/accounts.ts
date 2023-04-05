import { Characters } from "./characters";


export interface Account {
  name: string;
  characters: Characters;
}

export interface Accounts {
  [key: number]: Accounts;
}
