export type SelectedExpansion = 'classic' | 'tbc' | 'wotlk' | null;

export interface Expansion {
  selected: SelectedExpansion
}

export type SelectedFeature = 'quest_tracker' | 'aw_achieves' | null;

export interface Feature {
  selected: SelectedFeature
}
