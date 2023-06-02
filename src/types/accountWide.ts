import { AchCredit, AchProgress } from './achievements';
import { Characters } from './characters';
import { ExpansionSetting } from './expansions'
import { CompletedRegQuests } from './quests';

// ----------------------------------------------------------------
// Settings
// ----------------------------------------------------------------

export type AccountWideSettings = {
  xpac: ExpansionSetting;
  petsMounts: boolean;
  reputations: boolean;
  achievements: boolean;
  bots: boolean;
}

// ----------------------------------------------------------------
// Accounts & Characters
// ----------------------------------------------------------------

export type AllAccountData = {
  username: string;
  playerAcctIDs?: number[];
  characters: Characters;
  credit?: AchCredit;
  sharedProg?: AchProgress;
  quests?: CompletedRegQuests;
}

export type AllAccountsData = {
  [key: string]: AllAccountData;
}

// ----------------------------------------------------------------
// Achievement Progress
// ----------------------------------------------------------------

export type NewSharedProg = {
  counter: number;
  date: number;
}

export type NewSharedProgress = {
  [key: string]: NewSharedProg[];
}
