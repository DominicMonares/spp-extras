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

export interface SubzoneData {
  subzoneId: number;
  subzone: string;
}

export type ZoneData = SubzoneData[];

export interface ZonesData {
  [key: string]: ZoneData;
}
