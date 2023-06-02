import { AchCredit, AchProgress } from "./achievements";
import { Character } from "./characters";
import { ExpansionSetting } from "./expansions"
import { CompletedRegQuests, RegQuest } from "./quests";

export type AccountWideSettings = {
  xpac: ExpansionSetting;
  petsMounts: boolean;
  reputations: boolean;
  achievements: boolean;
  bots: boolean;
}

export interface AWCharacter extends Character {
  credit: AchCredit;
  progress: AchProgress;
  quests: CompletedRegQuests;
}

export type AllAccountData = {
  username: string;
  playerAccts?: number[];
  characters: Character[];
  credit: AchCredit;
  sharedProg: AchProgress;
  quests: CompletedRegQuests;
}
