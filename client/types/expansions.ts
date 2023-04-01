export interface ExpansionSliceState {
  selected: Expansion;
}

export interface ExpansionProps {
  updateStore: (xpac: Expansion) => void;
}

export type Expansion = 'classic' | 'tbc' | 'wotlk' | '';

export interface TabProps extends TabsProps {
  bufferHover: boolean;
  xpac: Expansion;
}

export interface TabsProps {
  openModal: (xpac: Expansion) => void;
}
