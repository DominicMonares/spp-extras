import { Accounts } from "./characters";
import { Expansion } from "./expansions";
import { CompletedQuests, TemplateQuests } from "./quests";


export type FetchAllData = (
  expansion: Expansion
) => Promise<FetchAllDataResponse>;

export interface FetchAllDataResponse {
  characters: Accounts;
  completed_quests: CompletedQuests;
  template_quests: TemplateQuests;
}

export type WebSocketMessage = (
  dispatchMessage: (message: string) => void
) => void;
