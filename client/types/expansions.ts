export interface Expansion {
  selected: SelectedExpansion;
}

export interface ExpansionProps {
  updateStore: (xpac: SelectedExpansion) => void;
}

export type SelectedExpansion = 'classic' | 'tbc' | 'wotlk' | null;

export interface TabProps extends TabsProps {
  active: string;
  expansion: SelectedExpansion;
}

export interface TabsProps {
  openModal: (xpac: SelectedExpansion) => void;
}
