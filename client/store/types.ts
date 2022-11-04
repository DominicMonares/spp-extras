export interface Expansion {
  selected: 'vanilla' | 'tbc' | 'wotlk' | null
}

export interface Character {
  guid: number,
  account: number,
  name: string,
  race: number,
  class_field: number,
  account_name: string
}

export interface Faction {
  [key: string]: Character
}

export interface Characters {
  alliance: Faction | Record<string, never>,
  horde: Faction | Record<string, never>
}
