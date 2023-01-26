import { CharacterClass } from "./characters";


export interface DropdownMenuProps {
  menu: Menu;
  type: DropdownType;
}

export interface DropdownProps {
  type: DropdownType;
  submenus: Menu;
  dropdown: boolean;
  depthLevel: number;
}

export type DropdownType = 'zone';

export type Menu = Submenu[];

export interface MenuItemsProps {
  type: DropdownType;
  items: Submenu;
  depthLevel: number;
}

export interface Submenu {
  title: string;
  submenu?: Menu;
  charClass?: CharacterClass;
}
