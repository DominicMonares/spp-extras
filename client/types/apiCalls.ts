import { Accounts } from "./characters";
import { Expansion } from "./expansions";
import { CompletedQuests, TemplateQuests } from "./quests";


export type FetchQuestTrackerData = (
  expansion: Expansion
) => Promise<FetchQuestTrackerResponse>;

export interface FetchQuestTrackerResponse {
  accounts: Accounts;
  completed_quests: CompletedQuests;
  template_quests: TemplateQuests;
}

export type WebSocketMessage = (
  dispatchMessage: (message: string) => void,
  settings: {
    [key: string]: boolean
  }
) => void;
