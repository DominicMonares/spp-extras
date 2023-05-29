import { CharacterClass, Characters, Race } from './characters';
import { Menu } from './dropdown';
import { Expansion } from './expansions';
import { Faction, FactionSetting } from './factions';
import {
  CharacterQuestClass,
  CharacterQuestRace,
  CharacterQuests,
  PlayerQuests,
  QuestTypeSetting,
  TemplateQuests
} from './quests';
import { ViewQuest, ViewQuests } from './view';

export type CreateViewQuests = (
  all: boolean,
  completedQuests: PlayerQuests | Record<string,never>,
  settings: QuestTrackerSettings,
  templateQuests: TemplateQuests | Record<string,never>
) => ViewQuests;

export type FilterQuests = (
  all: boolean,
  settings: QuestTrackerSettings,
  templateQuests: TemplateQuests | Record<string,never>
) => ViewQuests;

export type FilteredCharacterMenu = (
  chararcter: QTCharacter | undefined,
  characters: Characters,
  faction: Faction
) => Menu;

export type FilteredClassMenu = (
  expansion: Expansion,
  faction: Faction,
  characterClass: QTClass | undefined
) => Menu;

export type FilteredQuestTypeMenu = (
  expansion: Expansion,
  type: QuestType | undefined
) => Menu;

export type FilteredRaceMenu = (
  expansion: Expansion,
  faction: Faction,
  race: QTRace | undefined
) => Menu;

export type FilteredZoneMenu = (
  expansion: Expansion,
  zone: string | undefined
) => Menu;

export type MarkTemplateQuests = (
  characterQuests: CharacterQuests,
  filteredTemplateQuests: ViewQuests,
  type: QuestType
) => ViewQuests;

export interface QuestCondition {
  setting: QTCharacter | QTClass | Faction | QuestType | QTRace | string;
  conditionMet: () => boolean;
}

export interface QuestConditions {
  [key: string]: QuestCondition;
}

export interface QuestProps {
  quest: ViewQuest;
}

export interface QuestTrackerSettings {
  all: boolean;
  character: QTCharacter | Record<string,never>;
  characterClass: QTClass | Record<string,never>;
  faction: FactionSetting;
  race: QTRace | Record<string,never>;
  type: QuestTypeSetting;
  zone: string;
}

export interface QTCharacter {
  id: number;
  name: string;
  value: string;
}

export interface QTClass {
  id: CharacterClass;
  title: string;
  value: CharacterQuestClass;
}

export interface QTRace {
  id: Race;
  title: string;
  value: CharacterQuestRace;
}

export type SortSetting = 'name' | 'id' | 'status' | '';
