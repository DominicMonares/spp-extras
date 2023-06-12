import { AchReward } from './achievements';
import { Character } from './characters';
import { PetMountItem } from './petsMounts';
import { Quest, TemplateQuest } from './quests';

// ----------------------------------------------------------------
// Accounts
// ----------------------------------------------------------------

export type RawAccount = {
  id: number;
  username: string;
}

export type RawAccounts = RawAccount[];

// ----------------------------------------------------------------
// Characters
// ----------------------------------------------------------------

export type RawCharacters = Character[];

// ----------------------------------------------------------------
// Quests
// ----------------------------------------------------------------

export type RawComplRegQuests = Quest[];

// Used for dailies, weeklies, and monthlies
export type RawComplRepeatQuests = Quest[];

export type RawTemplateQuests = TemplateQuest[];

// ----------------------------------------------------------------
// Achievements - Credit & Progress
// ----------------------------------------------------------------

export type RawAchCred = {
  guid: number;
  achievement: number;
  date: number;
}

export type RawAchCredit = RawAchCred[];

export type RawAchProg = {
  criteria: number;
  counter: number;
  date: number;
}

export interface RawCharAchProg extends RawAchProg {
  guid: number;
}

export type RawCharAchProgress = RawCharAchProg[];

export interface RawSharedAchProg extends RawAchProg {
  id: number;
}

export type RawSharedAchProgress = RawSharedAchProg[];

// ----------------------------------------------------------------
// Achievements - Rewards
// ----------------------------------------------------------------

export type RawAchRewards = AchReward[];

export type RawAchRewItemCharge = {
  entry: number;
  spellcharges_1: number;
}

export type RawAchRewItemCharges = RawAchRewItemCharge[];

// ----------------------------------------------------------------
// Pets & Mounts
// ----------------------------------------------------------------

export type RawPetMountItems = PetMountItem[];

export type RawPetMountSpell = {
  guid: number;
  spell: number;
}

export type RawPetMountSpells = RawPetMountSpell[];

export type RawCharRidingSkill = {
  guid: number;
  value: number;
}

export type RawCharRidingSkills = RawCharRidingSkill[];

// ----------------------------------------------------------------
// Reputations
// ----------------------------------------------------------------

export type RawReputation = {
  guid: number;
  faction: number;
  standing: number;
  flags: number;
}

export type RawReputations = RawReputation[];
