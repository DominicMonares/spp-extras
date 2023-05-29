export interface ExpansionProps {
  getAllData: (e: any, xpac: Expansion) => void;
}

export type Expansion = 'classic' | 'tbc' | 'wotlk';

export type ExpansionSetting = Expansion | '';

export interface TabProps extends TabsProps {
  bufferHover: boolean;
  xpac: Expansion;
}

export interface TabsProps {
  openModal: (xpac: Expansion) => void;
}
