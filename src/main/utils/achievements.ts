import _factionAchievements from '../../../data/achievements/factionAchievements.json';

// Organize all quest, achievement, and other character related data by character
export const formatAllAcctData = ( // TEMP ANYS
  accounts: any,
  achCredit: any,
  achCharProg: any,
  achSharedProg: any,
  completedQuests: any,
) => {
  // Use accounts as base for all data
  const all: any = accounts; // TEMP ANY

  // Iterate through all accounts and characters to add data
  for (const acctID in accounts) {
    const account = all[acctID];
    const player = acctID === '0';
    const playerAccts = player ? account.playerAccts : [];

    // Combine characters
    const allianceChars = account.characters.alliance;
    const hordeChars = account.characters.horde;
    const mergedChars = { ...allianceChars, ...hordeChars };
    all[acctID]['characters'] = mergedChars;
    const chars = all[acctID]['characters'];

    // Combine quests and achievement credit/progress
    const credit: any = {}; // TEMP ANY
    const sharedProgress = achSharedProg[acctID] || {};
    const quests: any = {}; // TEMP ANY
    if (!chars) continue;
    for (const charID in chars) {
      // Ensure character matches account
      const char = chars[charID];
      const validPlayerAcct = playerAccts[char.account];
      const validPlayerChar = acctID === '0' && validPlayerAcct;
      const validBotAcct = char.account === Number(acctID);
      const validBotChar = acctID !== '0' && validBotAcct;

      // Add to account-wide achievement credit if char is valid
      if (validPlayerChar || validBotChar) {
        all[acctID]['characters'][charID]['credit'] = {};
        if (achCredit[charID]) {
          for (const achID in achCredit[charID]) {
            const incomingDate = achCredit[charID][achID];
            const existingDate = credit[achID] || incomingDate;

            // Use oldest completion date if achievement already exists
            const olderEntry = existingDate > incomingDate;
            if (!credit[achID] || olderEntry) credit[achID] = incomingDate;

            // Add data for each character
            const charCredit = achCredit[charID];
            all[acctID]['characters'][charID]['credit'] = charCredit;
          }
        }

        // Add to account-wide quest credit
        all[acctID]['characters'][charID]['quests'] = {};
        if (completedQuests[charID]) {
          all[acctID]['characters'][charID]['quests'] = {};
          const completedReg = completedQuests[charID]['regular'];
          for (const questID in completedReg) {
            const quest = completedReg[questID];
            if (!quests[questID]) {
              quests[questID] = quest;
            } else {
              const existing_date = quests[questID]['timer'];
              const incoming_date = quest.timer;

              // Use more recent date for Loremaster progress
              if (incoming_date > existing_date) quests[questID] = quest;
            }
          }

          const charQuests = completedQuests[charID];
          all[acctID]['characters'][charID]['quests'] = charQuests;
        }

        // Add data for each character
        const charProg = achCharProg[charID] || {};
        all[acctID]['characters'][charID]['progress'] = charProg;
      }
    }

    // Add data for each account
    all[acctID]['credit'] = credit;
    all[acctID]['sharedProgress'] = sharedProgress;
    all[acctID]['quests'] = quests;
  }

  return all;
}

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
