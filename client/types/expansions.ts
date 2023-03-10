export interface Expansion {
  selected: SelectedExpansion;
}

export type SelectedExpansion = 'classic' | 'tbc' | 'wotlk' | null;

export interface TabProps extends TabsProps {
  active: string;
}

export interface TabsProps {
  openModal: (xpac: SelectedExpansion) => void;
}
