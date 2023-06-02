import { AllCharacters, ClassSetting, RaceSetting } from './characters';
import { Faction, FactionSetting } from './characters';
import {
  AllCompletedQuests,
  AllTemplateQuests,
  CharacterQuests,
  CompletedQuests,
  QuestTypeSetting,
} from './quests';
import { ViewQuest, ViewQuests } from './view';

export type AllQTData = {
  characters: AllCharacters;
  completedQuests: CompletedQuests;
  templateQuests: AllTemplateQuests;
}

export type CreateViewQuests = (
  all: boolean,
  completedQuests: AllCompletedQuests | Record<string,never>,
  settings: QuestTrackerSettings,
  templateQuests: AllTemplateQuests | Record<string,never>
) => ViewQuests;

export type MarkTemplateQuests = (
  characterQuests: CharacterQuests,
  filteredTemplateQuests: ViewQuests,
  type: QuestTypeSetting,
) => ViewQuests;

export type QuestCondition = {
  setting: QTCharacter | QTClass | Faction | QuestTypeSetting | QTRace | string | Record<string,never | boolean>;
  conditionMet: () => boolean;
}

export type QuestConditions = {
  [key: string]: QuestCondition;
}

export type QuestProps = {
  quest: ViewQuest;
}

export type QuestTrackerSettings = {
  all: boolean;
  character: QTCharacter | Record<string,never>;
  characterClass: QTClass | Record<string,never>;
  faction: FactionSetting;
  race: QTRace | Record<string,never>;
  type: QuestTypeSetting;
  zone: string;
}

export type QTCharacter = {
  id: number;
  name: string;
  value: string;
}

export type QTClass = {
  id: ClassSetting;
  title: string;
  value: number;
}

export type QTRace = {
  id: RaceSetting;
  title: string;
  value: number;
}

export type SortSetting = 'name' | 'id' | 'status' | '';
