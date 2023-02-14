export interface Expansion {
  selected: SelectedExpansion;
}

export interface Feature {
  selected: SelectedFeature;
}

export interface FeatureNavProps {
  feature: SelectedFeature;
  name: string;
}

export type SelectedExpansion = 'classic' | 'tbc' | 'wotlk' | null;

export type SelectedFeature = 'questTracker' | 'accountAchievements' | null;
