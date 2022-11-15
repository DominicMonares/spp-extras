import { Race } from './characters';

export interface RegQuest {
  guid: number,
  quest: number,
  status: number,
  rewarded: number,
  explored: number,
  timer: number,
  mobcount1: number,
  mobcount2: number,
  mobcount3: number,
  mobcount4: number,
  itemcount1: number,
  itemcount2: number,
  itemcount3: number,
  itemcount4: number
}

export interface RegQuests {
  [key: string]: RegQuest
}

export interface RepeatQuest {
  guid: number,
  quest: number
}

export interface RepeatQuests {
  [key: string]: RepeatQuest
}

export interface CharQuests {
  reg: RegQuests,
  weekly: RepeatQuests
}

export interface FactionQuests {
  [key: string]: CharQuests
}

export interface CompletedQuests {
  alliance: FactionQuests,
  horde: FactionQuests
}

export interface AllQuestTemplate {
  entry: number,
  requiredclasses: number,
  requiredraces: number,
  title: string,
  type: number,
  zoneorsort: number
}

export interface AllFactionQuests {
  [key: string]: AllQuestTemplate
}

export interface AllQuests {
  alliance: AllFactionQuests,
  horde: AllFactionQuests,
  both: AllFactionQuests
}

export type QuestTrackerFaction = 'alliance' | 'horde' | 'both';

export type QuestTrackerClass = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11;

export interface QuestTrackerFilter {
  faction?: QuestTrackerFaction | null,
  zone?: number | null,
  race?: Race | null,
  class?: QuestTrackerClass | null,
  character?: string | null
}

export interface ViewQuest extends AllQuestTemplate {
  completed: boolean
}

export interface ViewQuests {
  [key: string]: ViewQuest
}
