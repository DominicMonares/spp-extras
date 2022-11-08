export type SelectedExpansion = 'classic' | 'tbc' | 'wotlk' | null;

export interface Expansion {
  selected: SelectedExpansion
}

export interface Character {
  guid: number,
  account: number,
  name: string,
  race: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 10 | 11,
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

export type SelectedFeature = 'quest_tracker' | 'aw_achieves' | null;

export interface Feature {
  selected: SelectedFeature
}
