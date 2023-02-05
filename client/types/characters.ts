export interface Character {
  guid: number;
  account: number;
  name: string;
  race: Race;
  class_field: number;
  account_name: string;
}

export type CharacterClass = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11;

export interface Characters {
  alliance: FactionCharacters;
  horde: FactionCharacters;
}

export type Faction = 'alliance' | 'horde' | 'both';

export interface FactionCharacters {
  [key: string]: Character;
}

export type Race = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 10 | 11;
