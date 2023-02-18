import { 
  CharacterClass, 
  Characters, 
  Faction, 
  Race
} from './characters';
import { Menu } from './dropdown';
import { SelectedExpansion } from './general';


export interface CharacterQuests {
  regular: Quests;
  daily?: Quests;
  weekly: Quests;
  monthly?: Quests;
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

export type CreateViewQuests = (
  completedQuests: CompletedQuests,
  settings: QuestTrackerSettings,
  templateQuests: TemplateQuests
) => ViewQuests;

export interface FactionQuests {
  [key: string]: CharacterQuests;
}

export type FilterQuests = (
  settings: QuestTrackerSettings,
  templateQuests: TemplateQuests
) => ViewQuests;

export type FilteredCharacterMenu = (
  chararcter: CharacterSetting | Record<string, never>,
  characters: Characters,
  faction: Faction
) => Menu;

export type FilteredClassMenu = (
  expansion: SelectedExpansion,
  faction: Faction,
  characterClass: ClassSetting | Record<string, never>
) => Menu;

export type FilteredQuestTypeMenu = (
  expansion: SelectedExpansion,
  type: QuestType
) => Menu;

export type FilteredRaceMenu = (
  expansion: SelectedExpansion,
  faction: Faction,
  race: RaceSetting | Record<string, never>
) => Menu;

export type FilteredZoneMenu = (
  expansion: SelectedExpansion,
  zone: string
) => Menu;

export type MarkTemplateQuests = (
  characterQuests: CharacterQuests,
  filteredTemplateQuests: ViewQuests,
  type: QuestType
) => ViewQuests;

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

export interface QuestCondition {
  setting: Faction | QuestType | string | ClassSetting | RaceSetting | CharacterSetting | Record<string, never>;
  conditionMet: () => boolean;
}

export interface QuestConditions {
  [key: string]: QuestCondition;
}

export interface QuestFlags {
  regular: number[];
  daily?: number[];
  weekly: number[];
  monthly?: number[];
}

export interface QuestProps {
  quest: ViewQuest;
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

export interface QuestTrackerControlsProps {
  characters: Characters;
}

export interface QuestTrackerSettings {
  character?: CharacterSetting | Record<string, never>;
  characterClass?: ClassSetting | Record<string, never>;
  faction: Faction;
  race?: RaceSetting | Record<string, never>;
  type?: QuestType;
  zone?: string;
}

export interface QuestTrackerViewProps {
  templateQuests: TemplateQuests;
  completedQuests: CompletedQuests;
}

export type QuestType = 'regular' | 'daily' | 'weekly' | 'monthly';

export interface RaceSetting { 
  id: Race;
  title: string;
  value: CharacterQuestRace;
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

export interface ViewSubzone {
  subzoneId: number;
  subzone: string;
}

export type ViewZone = ViewSubzone[];

export interface ViewZones {
  [key: string]: ViewZone;
}
