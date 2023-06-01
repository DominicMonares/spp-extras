import { TemplateQuest } from "./quests";
import { SortSetting } from "./questTracker";


export type SortViewQuests = (
  viewQuests: ViewQuests,
  sortSetting: SortSetting
) => ViewQuests

export type ViewProps = {
  error?: string;
  getAllData?: () => void;
  loading?: boolean;
}

export interface ViewQuest extends TemplateQuest {
  completed: boolean;
}

export type ViewQuests = ViewQuest[];

export type ViewSubzone = {
  subzoneId: number;
  subzone: string;
}

export type ViewZone = ViewSubzone[];

export type ViewZones = {
  [key: string]: ViewZone;
}
