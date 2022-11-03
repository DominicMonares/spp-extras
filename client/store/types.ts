export interface Expansion {
  expansion: string | null
}

export interface Character {
  guid: number | null,
  account: number | null,
  name: string | null,
  race: number | null,
  class_field: number | null,
  account_name: string | null
}

export interface Alliance {
  [key: string]: Character
}

export interface Horde {
  [key: string]: Character
}

export interface Factions {
  alliance: Alliance | null,
  horde: Horde | null
}

export interface Characters {
  characters: Factions | null
}
