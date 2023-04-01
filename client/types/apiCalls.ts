import { Characters } from "./characters";
import { Expansion } from "./expansions";
import { CompletedQuests, TemplateQuests } from "./quests";


export type FetchCharacters = (
  expansion: Expansion
) => Promise<Characters>;

export type FetchCompQuests = (
  expansion: Expansion,
  characters: string
) => Promise<CompletedQuests>;

export type FetchTemplateQuests = (
  expansion: Expansion
) => Promise<TemplateQuests>;
