import { Characters } from './characters';
import { Faction } from './factions';

export type CharacterQuests = {
  regular: Quests;
  daily?: Quests;
  weekly: Quests;
  monthly?: Quests;
}

export type CharacterQuestClass = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 1024;

export type CharacterQuestRace = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 512 | 1024;

export type CompletedRegQuests = {
  [key: string]: RegQuest;
}

export type CompletedQuests = {
  [key: string]: CharacterQuests;
}

export type PlayerQuests = {
  alliance: CompletedQuests;
  horde: CompletedQuests;
}

export type Quest = {
  guid: number;
  quest: number;
}

export interface RegQuest extends Quest {
  status: number;
  rewarded: number;
  explored: number;
  timer: number;
  mobcount1: number;
  mobcount2: number;
  mobcount3: number;
  mobcount4: number;
  itemcount1: number;
  itemcount2: number;
  itemcount3: number;
  itemcount4: number;
}

export type QuestFlags = {
  regular: number[];
  daily?: number[];
  weekly: number[];
  monthly?: number[];
}

export type QuestRace = {
  questRaceId: number;
  faction: Faction;
  races: string;
  raceIds: number[];
}

export type QuestRaces = {
  [key: string]: QuestRace;
}

export type Quests = {
  [key: string]: Quest;
}

export type QuestType = 'regular' | 'daily' | 'weekly' | 'monthly';

export type QuestTypeSetting = QuestType | '';

export type TemplateFactionQuests = {
  [key: string]: TemplateQuest;
}

export type TemplateQuest = {
  entry: number;
  ZoneOrSort: number;
  Type: number;
  RequiredClasses: number;
  RequiredRaces: number;
  Title: string;
  QuestFlags: number;
}

export type TemplateQuests = {
  alliance: TemplateFactionQuests | Record<string,never>;
  horde: TemplateFactionQuests | Record<string,never>;
  neutral: TemplateFactionQuests | Record<string,never>;
}
