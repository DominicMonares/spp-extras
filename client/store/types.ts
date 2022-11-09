export type SelectedExpansion = 'classic' | 'tbc' | 'wotlk' | null;

export interface Expansion {
  selected: SelectedExpansion
}

export interface Character {
  guid: number,
  account: number,
  name: string,
  race: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 10 | 11,
  class_field: number,
  account_name: string
}

export interface Faction {
  [key: string]: Character
}

export interface Characters {
  alliance: Faction | Record<string, never>,
  horde: Faction | Record<string, never>
}

export type SelectedFeature = 'quest_tracker' | 'aw_achieves' | null;

export interface Feature {
  selected: SelectedFeature
}

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
  alliance: FactionQuests | Record<string, never>,
  horde: FactionQuests | Record<string, never>
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
  alliance: AllFactionQuests | Record<string, never>,
  horde: AllFactionQuests | Record<string, never>,
  both: AllFactionQuests | Record<string, never>
}
