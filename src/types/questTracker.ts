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

export interface AllQTData {
  accounts: Accounts;
  completed_quests: CompletedQuests;
  template_quests: TemplateQuests;
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

export interface QuestCondition {
  setting: QTCharacter | QTClass | Faction | QuestTypeSetting | QTRace | string;
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
  id: ClassSetting;
  title: string;
  value: CharacterQuestClass | 0;
}

export interface QTRace {
  id: RaceSetting;
  title: string;
  value: CharacterQuestRace | 0;
}

export type SortSetting = 'name' | 'id' | 'status' | '';
