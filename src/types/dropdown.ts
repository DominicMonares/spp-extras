export type DropdownType = 'character' | 'class' | 'type' | 'race' | 'zone';

export type Menu = Submenu[];

export interface Submenu {
  title: string;
  submenu?: Menu;
  id?: number;
  value?: number | string;
}
