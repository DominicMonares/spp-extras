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

export type SelectedFeature = 'questTracker' | 'awAchieves' | null;

export interface Subzone {
  subzoneId: number;
  subzone: string;
}

export type Zone = Subzone[];

export interface Zones {
  [key: string]: Zone;
}
