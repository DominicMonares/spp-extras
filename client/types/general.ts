export type SelectedExpansion = 'classic' | 'tbc' | 'wotlk' | null;

export interface Expansion {
  selected: SelectedExpansion
}

export interface Subzone {
  subzoneId: number,
  subzone: string
}

export type Zone = Subzone[];

export interface Zones {
  [key: string]: Zone
}

export type SelectedFeature = 'quest_tracker' | 'aw_achieves' | null;

export interface Feature {
  selected: SelectedFeature
}
