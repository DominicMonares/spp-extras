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
  TemplateQuest,
  TemplateQuests
} from './quests';


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

export type SortViewQuests = (
  viewQuests: ViewQuests,
  sortSetting: SortSetting
) => ViewQuests

export interface ViewQuest extends TemplateQuest {
  completed: boolean;
}

export type ViewQuests = ViewQuest[];

export interface ViewSubzone {
  subzoneId: number;
  subzone: string;
}

export type ViewZone = ViewSubzone[];

export interface ViewZones {
  [key: string]: ViewZone;
}

