export type SelectedExpansion = 'vanilla' | 'tbc' | 'wotlk' | null;

export interface Expansion {
  selected: SelectedExpansion
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

export type SelectedFeature = 'quest_tracker' | null;

export interface Feature {
  selected: SelectedFeature
}
