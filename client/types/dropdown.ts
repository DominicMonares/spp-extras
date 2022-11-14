export type Menu = Submenu[];

export interface Submenu {
  title: string,
  submenu?: Menu
}
