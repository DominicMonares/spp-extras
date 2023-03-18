import { 
  CharacterClass, 
  Faction, 
  Race
} from './characters';
import {
  CharacterQuestClass,
  CharacterQuestRace,
  QuestType
} from './quests';


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

export interface QuestTrackerSettings {
  character?: CharacterSetting | Record<string,never> | undefined;
  characterClass?: ClassSetting | Record<string,never> | undefined;
  faction?: Faction;
  race?: RaceSetting | Record<string,never> | undefined;
  type?: QuestType | undefined;
  zone?: string | undefined;
}

export interface RaceSetting { 
  id: Race;
  title: string;
  value: CharacterQuestRace;
}
