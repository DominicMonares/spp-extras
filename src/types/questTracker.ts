import { Accounts, CharacterClass, Characters, ClassSetting, Race, RaceSetting } from './characters';
import { Menu } from './dropdown';
import { Expansion } from './expansions';
import { Faction, FactionSetting } from './factions';
import {
  CharacterQuestClass,
  CharacterQuestRace,
  CharacterQuests,
  CompletedQuests,
  PlayerQuests,
  QuestTypeSetting,
  TemplateQuests,
} from './quests';
import { ViewQuest, ViewQuests } from './view';

export type AllQTData = {
  characters: Characters;
  completedQuests: CompletedQuests;
  templateQuests: TemplateQuests;
}

export type CreateViewQuests = (
  all: boolean,
  completedQuests: PlayerQuests | Record<string,never>,
  settings: QuestTrackerSettings,
  templateQuests: TemplateQuests | Record<string,never>
) => ViewQuests;

export type MarkTemplateQuests = (
  characterQuests: CharacterQuests,
  filteredTemplateQuests: ViewQuests,
  type: QuestTypeSetting
) => ViewQuests;

export type QuestCondition = {
  setting: QTCharacter | QTClass | Faction | QuestTypeSetting | QTRace | string;
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
  value: CharacterQuestClass | 0;
}

export type QTRace = {
  id: RaceSetting;
  title: string;
  value: CharacterQuestRace | 0;
}

export type SortSetting = 'name' | 'id' | 'status' | '';
