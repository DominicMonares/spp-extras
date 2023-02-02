import { Race, CharacterClass, Faction, Characters } from './characters';


export interface CharacterQuests {
  reg: RegQuests;
  daily?: RepeatQuests;
  weekly: RepeatQuests;
  monthly?: RepeatQuests;
}

export type CharacterQuestClass = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 1024;

export type CharacterQuestRace = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 512 | 1024;

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

export interface CompletedQuests {
  alliance: FactionQuests;
  horde: FactionQuests;
}

export interface FactionQuests {
  [key: string]: CharacterQuests;
}

export interface QuestCondition {
  setting: Faction | QuestType | string | ClassSetting | RaceSetting | CharacterSetting | Record<string, never>;
  conditionMet: () => boolean;
}

export interface QuestConditions {
  [key: string]: QuestCondition;
}

export interface QuestFlags {
  reg: number[];
  daily?: number[];
  weekly: number[];
  monthly?: number[];
}

export interface QuestProps {
  quest: ViewQuest;
}

export interface QuestTrackerControlsProps {
  characters: Characters;
}

export interface QuestTrackerSettings {
  faction?: Faction;
  type?: QuestType;
  zone?: string;
  characterClass?: ClassSetting | Record<string, never>;
  race?: RaceSetting | Record<string, never>;
  character?: CharacterSetting | Record<string, never>;
}

export interface QuestTrackerViewProps {
  templateQuests: TemplateQuests;
  completedQuests: CompletedQuests;
}

export type QuestType = 'reg' | 'daily' | 'weekly' | 'monthly';

export interface RaceSetting { 
  id: Race;
  title: string;
  value: CharacterQuestRace;
}

export interface RegQuest {
  guid: number;
  quest: number;
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

export interface RegQuests {
  [key: string]: RegQuest;
}

export interface RepeatQuest {
  guid: number;
  quest: number;
}

export interface RepeatQuests {
  [key: string]: RepeatQuest;
}

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
  alliance: TemplateFactionQuests;
  horde: TemplateFactionQuests;
  both: TemplateFactionQuests;
}

export interface ViewQuest extends TemplateQuest {
  completed: boolean;
}

export interface ViewQuests {
  [key: string]: ViewQuest;
}
