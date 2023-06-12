import {
  AchRewardItemCharges,
  AchRewards,
  AllAchCredit,
  AllAchProgress,
  Faction,
  FactionAchievements,
  RawAchCredit,
  RawAchRewItemCharges,
  RawAchRewards,
  RawCharAchProgress,
  RawSharedAchProgress,
} from 'types';
import _factionAchievements from '../data/achievements/factionAchievements.json';

const factionAchievements = _factionAchievements as FactionAchievements;

// Organize achievement credit by character
export const formatAchCredit = (credit: RawAchCredit) => {
  const all: AllAchCredit = {};
  credit.forEach(ach => {
    const guid = ach.guid;
    const achID = ach.achievement;
    if (!all[guid]) all[guid] = {};
    all[guid][achID] = ach.date;
  });
  return all;
}

// Organize achievement progress by character or account
export const formatAchProg = (prog: RawCharAchProgress | RawSharedAchProgress) => {
  const all: AllAchProgress = {};
  prog.forEach(ach => {
    const guidOrAcct = 'guid' in ach ? ach.guid : ach.id;
    if (!all[guidOrAcct]) all[guidOrAcct] = {};
    const criteria = ach.criteria; // Criteria is separate from achievement ID
    all[guidOrAcct][criteria] = {
      counter: ach.counter,
      date: ach.date,
    };
  });
  return all;
}

// Organize achievement rewards by achievement
export const formatAchRewards = (rewards: RawAchRewards) => {
  const all: AchRewards = {};
  rewards.forEach(ach => {
    // Store in arrays because of Matron/Patron duplicate
    const entry = ach.entry.toString();
    if (!all[entry]) all[entry] = [ach];
    else all[entry].push(ach);
  });
  return all;
}

// Organize reward item charges by item
export const formatRewItemCharges = (items: RawAchRewItemCharges) => {
  const all: AchRewardItemCharges = {};
  items.forEach(i => {
    const entry = i.entry;
    all[entry] = i.spellcharges_1;
  });
  return all;
}

// Check to see if achievement is faction specific and matches char faction
// Return alt achievement ID if faction doesn't match
export const checkFactionAch = (achID: number, faction: Faction): [boolean, number] => {
  let factionMatch = false;
  const factionAch = factionAchievements[achID];
  if (factionAch) {
    if (factionAch.faction === faction) {
      factionMatch = true;
    } else if (factionAch.alt) {
      // Achievement has opposing faction equivalent
      achID = factionAch.alt;
      factionMatch = true;
    }
  } else {
    // Not a faction specific achievement
    factionMatch = true;
  }

  return [factionMatch, achID];
}
