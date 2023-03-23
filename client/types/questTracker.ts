import { 
  CharacterClass, 
  Characters,
  Faction, 
  Race
} from './characters';
import { Menu } from './dropdown';
import { SelectedExpansion } from './expansions';
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
  completedQuests: CompletedQuests | Record<string,never>,
  settings: QuestTrackerSettings,
  templateQuests: TemplateQuests | Record<string,never>
) => ViewQuests;

export type FilterQuests = (
  settings: QuestTrackerSettings,
  templateQuests: TemplateQuests | Record<string,never>
) => ViewQuests;

export type FilteredCharacterMenu = (
  chararcter: CharacterSetting | Record<string,never> | undefined,
  characters: Characters,
  faction: Faction
) => Menu;

export type FilteredClassMenu = (
  expansion: SelectedExpansion,
  faction: Faction,
  characterClass: ClassSetting | Record<string,never> | undefined
) => Menu;

export type FilteredQuestTypeMenu = (
  expansion: SelectedExpansion,
  type: QuestType | Record<string,never> | undefined
) => Menu;

export type FilteredRaceMenu = (
  expansion: SelectedExpansion,
  faction: Faction,
  race: RaceSetting | Record<string,never> | undefined
) => Menu;

export type FilteredZoneMenu = (
  expansion: SelectedExpansion,
  zone: string | Record<string,never> | undefined
) => Menu;

export type MarkTemplateQuests = (
  characterQuests: CharacterQuests,
  filteredTemplateQuests: ViewQuests,
  type: QuestType
) => ViewQuests;

export interface QuestCondition {
  setting: Faction | QuestType | string | ClassSetting | RaceSetting | CharacterSetting | undefined | Record<string,never>;
  conditionMet: () => boolean;
}

export interface QuestConditions {
  [key: string]: QuestCondition;
}

export interface QuestProps {
  quest: ViewQuest;
}

export interface QuestTrackerSettings {
  character?: CharacterSetting | Record<string,never> | undefined;
  characterClass?: ClassSetting | Record<string,never> | undefined;
  faction?: Faction;
  race?: RaceSetting | Record<string,never> | undefined;
  type?: QuestType | undefined;
  zone?: string | undefined;
}

export interface RaceSetting { 
  id: Race;
  title: string;
  value: CharacterQuestRace;
}

export interface ViewQuest extends TemplateQuest {
  completed: boolean;
}

export interface ViewQuests {
  [key: string]: ViewQuest;
}

export interface ViewSubzone {
  subzoneId: number;
  subzone: string;
}

export type ViewZone = ViewSubzone[];

export interface ViewZones {
  [key: string]: ViewZone;
}

