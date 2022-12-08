import { Race, CharacterClass, Faction } from './characters';

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

export type QuestType = 'reg' | 'daily' | 'weekly';

export interface CharQuests {
  reg: RegQuests,
  daily: RepeatQuests,
  weekly: RepeatQuests
}

export interface FactionQuests {
  [key: string]: CharQuests
}

export interface CompletedQuests {
  alliance: FactionQuests,
  horde: FactionQuests
}

export interface TemplateQuest {
  entry: number,
  requiredclasses: number,
  requiredraces: number,
  title: string,
  type: number,
  zoneorsort: number,
  questflags: number
}

export interface TemplateFactionQuests {
  [key: string]: TemplateQuest
}

export interface TemplateQuests {
  alliance: TemplateFactionQuests,
  horde: TemplateFactionQuests,
  both: TemplateFactionQuests
}

export type CharacterQuestClass = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 1024;

export interface ClassSetting {
  id: CharacterClass,
  value: CharacterQuestClass
}

export interface QuestTrackerSettings {
  faction?: Faction,
  type?: QuestType,
  zone?: string,
  charClass?: ClassSetting,
  race?: Race,
  character?: string
}

export interface QuestFlags {
  reg: number[],
  daily: number[],
  weekly: number[]
}

export interface ViewQuest extends TemplateQuest {
  completed: boolean
}

export interface ViewQuests {
  [key: string]: ViewQuest
}

export interface QuestCondition {
  setting: Faction | QuestType | string | ClassSetting | Race,
  conditionMet: () => boolean
}

export interface QuestConditions {
  [key: string]: QuestCondition
}
