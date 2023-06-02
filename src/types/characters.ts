import { AchCredit, AchProgress } from "./achievements";
import { CharacterQuests } from "./quests";

export type Character = {
  guid: number;
  account: number;
  name: string;
  race: Race;
  gender?: 0 | 1 | 2;
  class: number;
  knownTitles?: string;
  credit?: AchCredit;
  progress?: AchProgress;
  quests?: CharacterQuests | Record<string,never>;
}

export type CharacterClass = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11;

export type ClassSetting = CharacterClass | 0;

export type AllCharacters = {
  alliance: Characters | Record<string,never>;
  horde: Characters | Record<string,never>;
}

export type Characters = {
  [key: string]: Character;
}

export type Race = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 10 | 11;

export type RaceSetting = Race | 0;
