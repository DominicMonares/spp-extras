export type Menu = Submenu[];

export interface Submenu {
  title: string,
  submenu?: Menu
}

export interface DropdownType {
  type: 'zone' | null
}