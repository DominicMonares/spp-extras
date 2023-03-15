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

export interface MenuButtonProps {
  selected: () => string;
  subHovering: boolean;
  title: string;
} 

export interface MenuItemsProps {
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

export interface SubmenuButtonProps {
  final: boolean;
  handleSelection: (e: React.MouseEvent<HTMLInputElement>) => void;
  subHovering: boolean;
  item: Submenu;
} 
