export type Race = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 10 | 11;

export interface Character {
  guid: number,
  account: number,
  name: string,
  race: Race,
  class_field: number,
  account_name: string
}

export interface Faction {
  [key: string]: Character
}

export interface Characters {
  alliance: Faction,
  horde: Faction
}
