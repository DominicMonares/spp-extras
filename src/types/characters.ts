export type Account = {
  username: string;
  characters: Characters;
}

export type Accounts = {
  [key: number]: Account;
}

export type Character = {
  guid: number;
  account: number;
  name: string;
  race: Race;
  gender?: number;
  class_field: number;
  knowntitles?: string;
}

export type CharacterClass = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11;

export type ClassSetting = CharacterClass | 0;

export type Characters = {
  alliance: FactionCharacters | Record<string,never>;
  horde: FactionCharacters | Record<string,never>;
}

export type FactionCharacters = {
  [key: string]: Character;
}

export type Race = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 10 | 11;

export type RaceSetting = Race | 0;
