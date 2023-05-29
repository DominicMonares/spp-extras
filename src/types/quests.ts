import { Characters } from './characters';
import { Faction } from './factions';


// export interface AllQuests {
//   completedQuests: CompletedQuests | Record<string,never>;
//   templateQuests: TemplateQuests | Record<string,never>;
// }

export interface CharacterQuests {
  regular: Quests;
  daily?: Quests;
  weekly: Quests;
  monthly?: Quests;
}

export type CharacterQuestClass = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 1024;

export type CharacterQuestRace = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 512 | 1024;

export interface CompletedQuests {
  [key: string]: CharacterQuests;
}

export type CreatePlayerQuests = (
  characters: Characters,
  completedQuests: CompletedQuests
) => PlayerQuests;

export interface PlayerQuests {
  alliance: CompletedQuests;
  horde: CompletedQuests;
}

export interface Quest {
  guid: number;
  quest: number;
  status?: number;
  rewarded?: number;
  explored?: number;
  timer?: number;
  mobcount1?: number;
  mobcount2?: number;
  mobcount3?: number;
  mobcount4?: number;
  itemcount1?: number;
  itemcount2?: number;
  itemcount3?: number;
  itemcount4?: number;
}

export interface QuestFlags {
  regular: number[];
  daily?: number[];
  weekly: number[];
  monthly?: number[];
}

export interface QuestRace {
  questRaceId: number;
  faction: Faction;
  races: string;
  raceIds: number[];
}

export interface QuestRaces {
  [key: string]: QuestRace;
}

export interface Quests {
  [key: string]: Quest;
}

export type QuestType = 'regular' | 'daily' | 'weekly' | 'monthly';

export type QuestTypeSetting = QuestType | '';

export interface TemplateFactionQuests {
  [key: string]: TemplateQuest;
}

export interface TemplateQuest {
  entry: number;
  requiredclasses: number;
  requiredraces: number;
  title: string;
  type: number;
  zoneorsort: number;
  questflags: number;
}

export interface TemplateQuests {
  alliance: TemplateFactionQuests | Record<string,never>;
  horde: TemplateFactionQuests | Record<string,never>;
  neutral: TemplateFactionQuests | Record<string,never>;
}
