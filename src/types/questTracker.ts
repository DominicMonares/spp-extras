import {
  AllCharacters,
  ClassSetting,
  Faction,
  RaceSetting
} from './characters';
import {
  AllTemplateQuests,
  CompletedQuests,
  QuestTypeSetting,
  TemplateQuest,
} from './quests';

// ----------------------------------------------------------------
// Quest Tracker Data
// ----------------------------------------------------------------

export type AllQTData = {
  characters: AllCharacters;
  completedQuests: CompletedQuests;
  templateQuests: AllTemplateQuests;
}


// ----------------------------------------------------------------
// Filtering
// ----------------------------------------------------------------

export type QuestCondition = {
  setting: QTCharacter
    | QTClass
    | Faction
    | QuestTypeSetting
    | QTRace
    | string
    | Record<string,never>
    | boolean;
  conditionMet: () => boolean;
}

export type QuestConditions = {
  [key: string]: QuestCondition;
}

// ----------------------------------------------------------------
// Settings
// ----------------------------------------------------------------

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

export type QuestTrackerSettings = {
  all: boolean;
  character: QTCharacter | Record<string,never>;
  characterClass: QTClass | Record<string,never>;
  race: QTRace | Record<string,never>;
  type: QuestTypeSetting;
  zone: string;
}

export type SortSetting = 'name' | 'id' | 'status' | '';

// ----------------------------------------------------------------
// View
// ----------------------------------------------------------------

export interface ViewQuest extends TemplateQuest {
  completed: boolean;
}

export type ViewQuests = ViewQuest[];

export type SortViewQuests = (
  viewQuests: ViewQuests,
  sortSetting: SortSetting,
) => ViewQuests

export type ViewSubzone = {
  subzoneId: number;
  subzone: string;
}

export type ViewZone = ViewSubzone[];

export type ViewZones = {
  [key: string]: ViewZone;
}
