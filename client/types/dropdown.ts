import { CharacterClass } from "./characters";

export type Menu = Submenu[];

export interface Submenu {
  title: string,
  submenu?: Menu,
  charClass?: CharacterClass
}

export type DropdownType ='zone';