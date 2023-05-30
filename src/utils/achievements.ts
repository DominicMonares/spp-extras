import _factionAchievements from '../../data/achievements/factionAchievements.json';

// Organize achievement credit by character
export const formatAchCredit = (achievements: any) => { // TEMP ANY
  const all: any = {}; // TEMP ANY
  achievements.forEach((a: any) => { // TEMP ANY
    const guid = a.guid.toString();
    if (!all[guid]) all[guid] = {};
    const achID = a.achievement.toString();
    all[guid][achID] = a.date;
  });
  return all;
}

// Organize achievement progress by character or account
export const formatAchProg = (type: any, achievements: any) => { // TEMP ANY
  const all: any = {}; // TEMP ANY
  achievements.forEach((a: any) => { // TEMP ANY
    const charType = type === 'char';
    const guidOrAcct = charType ? a.guid : a.account;
    if (!all[guidOrAcct]) all[guidOrAcct] = {};

    // Criteria is separate from achievement ID
    const criteria = a.criteria;
    all[guidOrAcct][criteria] = {
      counter: a.counter,
      date: a.date,
    }
  });
  return all;
}

// Organize achievement rewards by achievement
export const formatAchRewards = (achievements: any) => { // TEMP ANY
  const all: any = {}; // TEMP ANY
  achievements.forEach((a: any) => { // TEMP ANY
    // Store in arrays b/c of Matron/Patron duplicate
    const entry = a.entry.toString();
    if (!all[entry]) all[entry] = [a];
    else all[entry].push(a);
  });
  return all;
}

// Organize reward item charges by item
export const formatRewItemCharges = (items: any) => { // TEMP ANY
  const all: any = {}; // TEMP ANY
  items.forEach((i: any) => { // TEMP ANY
    const entry = i.entry;
    all[entry] = i.spellcharges_1;
  });
  return all;
}

// Check to see if achievement is faction specific and matches char faction
// Return alt achievement ID if faction doesn't match
interface FactionAchievement { // MOVE TO TYPE FOLDER
  name: string;
  faction: string;
  alt: number | null;
}
interface FactionAchievements { // MOVE TO TYPE FOLDER
  [key: string]: FactionAchievement;
}
const factionAchievements = _factionAchievements as FactionAchievements;

export const checkFactionAch = (achID: number, faction: any): any => { // TEMP ANY
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
