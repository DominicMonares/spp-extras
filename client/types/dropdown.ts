export interface DropdownMenuProps {
  menu: Menu;
  type: DropdownType;
}

export interface DropdownProps {
  questType: DropdownType;
  submenus: Menu;
  dropdown: boolean;
  depthLevel: number;
}

export type DropdownType = 'character' | 'class' | 'type' | 'race' | 'zone';

export type Menu = Submenu[];

export interface MenuItemProps {
  questType: DropdownType;
  items: Submenu;
  depthLevel: number;
}

export interface Submenu {
  title: string;
  submenu?: Menu;
  id?: number;
  value?: number | string;
}
