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
  subject: string;
  text: string;
}

export type AchRewards = {
  [key: string]: AchReward;
}

export type AchRewardItemCharges = {
  [key: string]: number;
}
