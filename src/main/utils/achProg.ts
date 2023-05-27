import { checkFaction } from "./characters";
import {
  loremaster,
  loremasterEarned,
  miscLMCriteria
} from './loremaster';
import _questAchCriteria from '../../../data/achievements/questAchCriteria.json';
import _loremasterAchCriteria from '../../../data/achievements/loremasterAchCriteria.json';
import _sharedAchCriteria from '../../../data/achievements/sharedAchCriteria.json';
import _zoneContinents from '../../../data/zones/zoneContinents.json';

interface AchCriteria { // MOVE TO TYPE FILE
  [key: string]: {
    criteria?: number;
    achievement: number;
    description: string;
    threshold: number;
  };
}
const questAchCriteria = _questAchCriteria as AchCriteria;
interface LoremasterAchCriteria { // MOVE TO TYPE FILE
  alliance: AchCriteria;
  horde: AchCriteria;
}
const loremasterAchCriteria = _loremasterAchCriteria as LoremasterAchCriteria;
const sharedAchCriteria = _sharedAchCriteria as AchCriteria;
interface ZoneContinents { // MOVE TO TYPE FILE
  [key: string]: number;
}
const zoneContinents = _zoneContinents as ZoneContinents;

export const createAchProgArgs = (accounts: any, templateQuests: any) => { // TEMP ANYS
  interface ProgArgs { // REFACTOR/MOVE TO TYPES FILE
    [key: string]: any;
  }
  const args: ProgArgs = {
    charProgArgs: [],
    sharedProgArgs: [],
    newAccounts: accounts,
  }

  const addCharProgArgs = ( // TEMP ANYS
    guid: any,
    criteria: any,
    counter: any,
    date: any,
  ) => {
    args.charProgArgs.push({
      guid: guid,
      criteria: Number(criteria),
      counter: counter,
      date: date,
    });
  }

  const addSharedProgArgs = ( // TEMP ANYS
    acctID: any,
    criteriaID: any,
    counter: any,
    date: any,
  ) => {
    args.sharedProgArgs.push({
      account: acctID,
      criteria: Number(criteriaID),
      counter: counter,
      date: date
    });
  }

  for (const acctID in accounts) {
    const account = accounts[acctID];
    const chars = account.characters;
    const credit = account.credit;
    const sharedProgress = account.sharedProgress;
    const completedQuests = account.quests;
    const loremasterProg = {
      // Alliance Eastern Kingdoms
      1676: {count: 0, date: new Date('0000000000').getTime() / 1000},
      // Alliance Kalimdor
      1678: {count: 0, date: new Date('0000000000').getTime() / 1000},
      // Horde Eastern Kingdoms
      1677: {count: 0, date: new Date('0000000000').getTime() / 1000},
      // Horde Kalimdor
      1680: {count: 0, date: new Date('0000000000').getTime() / 1000},
    }

    // Organize all character shared achievement progress by criteria
    const newSharedProg: any = {}; // TEMP ANY

    const addToSharedProg = (criteriaID: any, achProg: any) => { // TEMP ANY
      if (!newSharedProg[criteriaID]) newSharedProg[criteriaID] = [achProg];
      else newSharedProg[criteriaID].push(achProg);
    }

    // Add existing progress for each char to newSharedProg
    for (const chardID in chars) {
      const char = chars[chardID];
      const charProg = char.progress;
      for (const criteriaID in charProg) {
        if (sharedAchCriteria[criteriaID]) {
          const achProg = charProg[criteriaID];
          addToSharedProg(criteriaID, achProg);
        }
      }
    }

    // Add args for all shared progress
    for (const criteriaID in newSharedProg) {
      const achProg = newSharedProg[criteriaID];
      let date = achProg[0]['date'];
      let previousCount = 0;
      let newCount = 0;
      let newProgress = 0;

      // Re-assign previous count and date if shared progress already exists
      const acctSharedExists = sharedProgress.length > 0;
      let acctSharedCriteriaExists = false;
      if (acctSharedExists) {
        const criteriaExists = sharedProgress[criteriaID];
        const acctSharedCriteriaExists = criteriaExists;
      }

      if (acctSharedCriteriaExists) {
        const sharedCriteria = sharedProgress[criteriaID];
        previousCount = sharedProgress.counter;
        date = sharedCriteria.date;
      }

      // Calculate new count using previous count
      achProg.forEach((charAchProg: any) => { // TEMP ANY
        // Use most recent date for progress
        const charProgDate = charAchProg.date;
        if (charProgDate > date) date = charProgDate;

        // Add to new progress count
        const charProgCount = charAchProg.counter;
        const count = charProgCount - previousCount;
        count >= 0 ? newProgress += count : newProgress += charProgCount;
      });

      // Create final count sum
      newCount = previousCount + newProgress;

      // Add misc Loremaster criteria to loremasterProg if it exists
      const miscLMCrit = miscLMCriteria(Number(criteriaID));
      if (miscLMCrit) {
        loremasterProg[miscLMCrit]['count'] += newCount;
        if (date > loremasterProg[miscLMCrit]['date']) {
          loremasterProg[miscLMCrit]['date'] = date;
        }
      }

      // Add shared achievement progress
      addSharedProgArgs(acctID, criteriaID, newCount, date);

      // Ensure progress counter doesn't exceed threshold
      const threshold = sharedAchCriteria[criteriaID]['threshold'];
      if (newCount > threshold) newCount = threshold;

      // Check to see if new achievement is earned
      // Add new achievement to all credit
      const achID = sharedAchCriteria[criteriaID]['achievement'];
      if (newCount === threshold && !credit[achID]) credit[achID] = date;

      // Add individual character progress
      for (const charID in chars) {
        const char = chars[charID];
        const faction = checkFaction(char.race);
        const isLMA = miscLMCrit === 1676 || miscLMCrit === 1678;
        const isAlliance = faction === 'alliance';
        const isAllianceProg = isLMA && isAlliance;
        const isLMH = miscLMCrit === 1677 || miscLMCrit === 1680;
        const isHorde = faction === 'horde';
        const isHordeProg = isLMH && isHorde;
        if (!miscLMCrit || isAllianceProg || isHordeProg) {
          addCharProgArgs(charID, criteriaID, newCount, date);
        }
      }
    }

    // Add all Loremaster progress
    const allLMProg = loremaster(completedQuests, templateQuests, loremasterProg);
    const mainLMProg = allLMProg.mainProg;
    const subLMProg = allLMProg.subProg;
    const allianceLMProg = subLMProg.alliance;
    const hordeLMProg = subLMProg.horde;

    // Add credit for Loremaster achievements if they exceed threshold
    const allianceEK = mainLMProg['1676'];
    const allianceEKCount = allianceEK.count;
    const allianceEKDate = allianceEK.date;
    if (loremasterEarned(1676, allianceEKCount)) credit['1676'] = allianceEKDate;
    const allianceK = mainLMProg['1678'];
    const allianceKCount = allianceK.count;
    const allianceKDate = allianceK.date;
    if (loremasterEarned(1678, allianceKCount)) credit['1678'] = allianceKDate;
    const hordeEK = mainLMProg['1677'];
    const hordeEKCount = hordeEK.count;
    const hordeEKDate = hordeEK.date;
    if (loremasterEarned(1677, hordeEKCount)) credit['1677'] = hordeEKDate;
    const hordeK = mainLMProg['1680'];
    const hordeKCount = hordeK.count;
    const hordeKDate = hordeK.date;
    if (loremasterEarned(1680, hordeKCount)) credit['1680'] = hordeKDate;

    // Add Loremaster progress for each character
    for (const charID in chars) {
      const char = chars[charID];
      const faction = checkFaction(char.race);
      if (faction === 'alliance') {
        for (const criteriaID in allianceLMProg) {
          const count = allianceLMProg[criteriaID]['count'];
          const date = allianceLMProg[criteriaID]['date'];
          addCharProgArgs(charID, criteriaID, count, date);
        }
      } else if (faction === 'horde') {
        for (const criteriaID in hordeLMProg) {
          const count = hordeLMProg[criteriaID]['count'];
          const date = hordeLMProg[criteriaID]['date'];
          addCharProgArgs(charID, criteriaID, count, date);
        }
      }
    }

    // Use length of credit for Complete {X} Quests achievement chain
    let completedQuestCount = completedQuests.length;
    for (const criteriaID in questAchCriteria) {
      const criteria = questAchCriteria[criteriaID];
      const date = new Date().getTime() / 1000;

      // Ensure progress counter doesn't exceed threshold
      const threshold = criteria.threshold;
      if (completedQuestCount > threshold) completedQuestCount = threshold;

      // Check to see if new achievement is earned
      // Add new achievement to all credit
      const achID = criteria.achievement.toString();
      const thresholdMet = completedQuestCount === threshold;
      if (thresholdMet && !credit[achID]) credit[achID] = date;

      // Add individual character progress
      for (const charID in chars) {
        addCharProgArgs(charID, criteriaID, completedQuestCount, date);
      }
    }

    // Add new credit to account
    args['newAccounts'][acctID]['credit'] = credit;
  }

  return args;
}
