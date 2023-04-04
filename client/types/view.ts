import { TemplateQuest } from "./quests";
import { SortSetting } from "./questTracker";


export type SortViewQuests = (
  viewQuests: ViewQuests,
  sortSetting: SortSetting
) => ViewQuests

export interface ViewProps {
  error?: string;
  loading?: boolean;
}

export interface ViewQuest extends TemplateQuest {
  completed: boolean;
}

export type ViewQuests = ViewQuest[];

export interface ViewSubzone {
  subzoneId: number;
  subzone: string;
}

export type ViewZone = ViewSubzone[];

export interface ViewZones {
  [key: string]: ViewZone;
}
