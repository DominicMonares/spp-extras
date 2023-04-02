import { CharacterClass, Characters, Race } from './characters';
import { Menu } from './dropdown';
import { Expansion } from './expansions';
import { Faction } from './factions';
import {
  CharacterQuestClass,
  CharacterQuestRace,
  CharacterQuests,
  CompletedQuests,
  QuestType,
  TemplateQuests
} from './quests';
import { ViewQuest, ViewQuests } from './view';


export interface CharacterSetting {
  id: number;
  name: string;
  value: string;
}

export interface ClassSetting {
  id: CharacterClass;
  title: string;
  value: CharacterQuestClass;
}

export type CreateViewQuests = (
  all: boolean,
  completedQuests: CompletedQuests,
  settings: QuestTrackerSettings,
  templateQuests: TemplateQuests
) => ViewQuests;

export type FilterQuests = (
  all: boolean,
  settings: QuestTrackerSettings,
  templateQuests: TemplateQuests | Record<string,never>
) => ViewQuests;

export type FilteredCharacterMenu = (
  chararcter: CharacterSetting,
  characters: Characters,
  faction: Faction
) => Menu;

export type FilteredClassMenu = (
  expansion: Expansion,
  faction: Faction,
  characterClass: ClassSetting
) => Menu;

export type FilteredQuestTypeMenu = (
  expansion: Expansion,
  type: QuestType
) => Menu;

export type FilteredRaceMenu = (
  expansion: Expansion,
  faction: Faction,
  race: RaceSetting
) => Menu;

export type FilteredZoneMenu = (
  expansion: Expansion,
  zone: string
) => Menu;

export type MarkTemplateQuests = (
  characterQuests: CharacterQuests,
  filteredTemplateQuests: ViewQuests,
  type: QuestType
) => ViewQuests;

export interface QuestCondition {
  setting: CharacterSetting | ClassSetting | Faction | QuestType | RaceSetting | string;
  conditionMet: () => boolean;
}

export interface QuestConditions {
  [key: string]: QuestCondition;
}

export interface QuestProps {
  quest: ViewQuest;
}

export interface QuestTrackerSettings {
  all?: boolean;
  character?: CharacterSetting;
  characterClass?: ClassSetting;
  faction?: Faction;
  race?: RaceSetting;
  type?: QuestType;
  zone?: string;
}

export interface RaceSetting { 
  id: Race;
  title: string;
  value: CharacterQuestRace;
}

export type SortSetting = 'name' | 'id' | 'status' | '';
