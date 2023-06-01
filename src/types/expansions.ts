export type Expansion = 'classic' | 'tbc' | 'wotlk';

export type ExpansionSetting = Expansion | '';

export interface TabProps extends TabsProps {
  bufferHover: boolean;
  xpac: Expansion;
}

export type TabsProps = {
  openModal: (xpac: Expansion) => void;
}
