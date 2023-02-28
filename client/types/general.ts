export interface Expansion {
  selected: SelectedExpansion;
}

export interface Feature {
  selected: SelectedFeature;
}

export interface NavbarProps {
  expansions: { [key: string]: string };
  openModal: (xpac: SelectedExpansion) => void;
}

export interface FeatureNavProps {
  feature: SelectedFeature;
  name: string;
}

export type SelectedExpansion = 'classic' | 'tbc' | 'wotlk' | null;

export type SelectedFeature = 'questTracker' | 'accountAchievements' | null;
