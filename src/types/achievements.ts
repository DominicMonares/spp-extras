import { Faction } from './characters';

// ----------------------------------------------------------------
// Credit
// ----------------------------------------------------------------

export type AchCredit = {
  [key: string]: number;
}

export type AllAchCredit = {
  [key: string]: AchCredit;
}

// ----------------------------------------------------------------
// Progress
// ----------------------------------------------------------------

export type AchProgress = {
  [key: string]: {
    counter: number;
    date: number;
  }
}

export type AllAchProgress = {
  [key: string]: AchProgress;
}

// ----------------------------------------------------------------
// Rewards
// ----------------------------------------------------------------

export type AchReward = {
  entry: number;
  gender: 0 | 1 | 2;
  title_A: number;
  title_H: number;
  item: number;
  sender: number;
  subject: string | null;
  text: string | null;
}

export type AchRewards = {
  [key: string]: AchReward[];
}

export type AchRewardItemCharges = {
  [key: string]: number;
}

// ----------------------------------------------------------------
// Loremaster Achievement Criteria
// ----------------------------------------------------------------

export type LoremasterCrit = {
  criteria: number;
  achievement: number;
  description: string;
  threshold: number;
}

export type LoremasterCriteria = {
  alliance: { [key: string]: LoremasterCrit };
  horde: { [key: string]: LoremasterCrit };
}

export type LMCriteriaTracker = {
  alliance: AchProgress;
  horde: AchProgress;
}

// ----------------------------------------------------------------
// JSON Data
// ----------------------------------------------------------------

export type FactionAchievement = {
  name: string;
  faction: Faction;
  alt: number | null;
}
export type FactionAchievements = {
  [key: string]: FactionAchievement;
}

export type AchCriteria = {
  [key: string]: {
    criteria?: number;
    achievement: number;
    description: string;
    threshold: number;
  };
}

export type LoremasterAchCriteria = {
  alliance: AchCriteria;
  horde: AchCriteria;
}

export type Title = {
  name: string;
  inGameOrder: number;
}

export type Titles = {
  [key: string]: Title;
}
