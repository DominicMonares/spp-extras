export type Race = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 10 | 11;

export type CharacterClass = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11;

export type Faction = 'alliance' | 'horde';

export interface Character {
  guid: number,
  account: number,
  name: string,
  race: Race,
  class_field: number,
  account_name: string
}

export interface FactionCharacters {
  [key: string]: Character
}

export interface Characters {
  alliance: FactionCharacters,
  horde: FactionCharacters
}
