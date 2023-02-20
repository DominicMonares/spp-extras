import { Characters } from "./characters";
import { SelectedExpansion } from "./general";
import { CompletedQuests, TemplateQuests } from "./quests";


export type FetchCharacters = (
  expansion: SelectedExpansion
) => Promise<Characters>;

export type FetchCompQuests = (
  expansion: SelectedExpansion,
  characters: string
) => Promise<CompletedQuests>;

export type FetchTemplateQuests = (
  expansion: SelectedExpansion
) => Promise<TemplateQuests>;
