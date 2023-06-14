import { checkFaction } from './characters';
import { loremaster, loremasterEarned, miscLMCriteria } from './loremaster';
import {
  AchCriteria,
  AllAccountsData,
  AllTemplateQuests,
  NewSharedProg,
  NewSharedProgress,
  ProgressValues,
} from 'types';
import _questAchCriteria from '../../data/achievements/questAchCriteria.json';
import _sharedAchCriteria from '../../data/achievements/sharedAchCriteria.json';

const questAchCriteria = _questAchCriteria as AchCriteria;
const sharedAchCriteria = _sharedAchCriteria as AchCriteria;

export const createProgValues = (
  allAcctData: AllAccountsData,
  templateQuests: AllTemplateQuests,
) => {
  const dbValues: ProgressValues = {
    charProgVals: [],
    sharedProgVals: [],
    newAcctData: allAcctData,
  };

  const addCharProgValues = (
    guid: number,
    criteria: number,
    counter: number,
    date: number,
  ) => {
    dbValues.charProgVals.push({
      guid: guid,
      criteria: Number(criteria),
      counter: counter,
      date: date,
    });
  }

  const addSharedProgValues = (
    acctID: number,
    criteriaID: number,
    counter: number,
    date: number,
  ) => {
    dbValues.sharedProgVals.push({
      id: acctID,
      criteria: Number(criteriaID),
      counter: counter,
      date: date,
    });
  }

  for (const acctID in allAcctData) {
    const account = allAcctData[acctID];
    const chars = account.characters;
    const credit = account.credit;
    const sharedProgress = account.sharedProg || {};
    const completedQuests = account.quests || {};
    const loremasterProg = {
      // Alliance Eastern Kingdoms
      1676: {counter: 0, date: new Date('0000000000').getTime() / 1000},
      // Alliance Kalimdor
      1678: {counter: 0, date: new Date('0000000000').getTime() / 1000},
      // Horde Eastern Kingdoms
      1677: {counter: 0, date: new Date('0000000000').getTime() / 1000},
      // Horde Kalimdor
      1680: {counter: 0, date: new Date('0000000000').getTime() / 1000},
    };

    // Organize all character shared achievement progress by criteria
    const newSharedProg: NewSharedProgress = {};

    const addToSharedProg = (criteriaID: number, achProg: NewSharedProg) => {
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
          addToSharedProg(Number(criteriaID), achProg);
        }
      }
    }

    // Add DB values for all shared progress
    for (const criteriaID in newSharedProg) {
      const achProg = newSharedProg[criteriaID];
      let date = achProg[0]['date'];
      let previousCount = 0;
      let newCount = 0;
      let newProgress = 0;

      // Re-assign previous count and date if shared progress already exists
      const sharedProgLen = sharedProgress ? Object.keys(sharedProgress).length : 0;
      const acctSharedExists = sharedProgLen > 0;
      let acctSharedCriteriaExists = false;
      if (acctSharedExists) {
        const criteriaExists = sharedProgress?.[criteriaID] ? true : false;
        acctSharedCriteriaExists = criteriaExists;
      }

      if (acctSharedCriteriaExists) {
        const sharedCriteria = sharedProgress?.[criteriaID];
        previousCount = sharedCriteria.counter || 0;
        date = sharedCriteria.date || 0;
      }

      // Calculate new count using previous count
      achProg.forEach(charAchProg => {
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
        loremasterProg[miscLMCrit]['counter'] += newCount;
        if (date > loremasterProg[miscLMCrit]['date']) {
          loremasterProg[miscLMCrit]['date'] = date;
        }
      }

      // Ensure progress counter doesn't exceed threshold
      const threshold = sharedAchCriteria[criteriaID]['threshold'];
      if (newCount > threshold) newCount = threshold;

      // Check to see if new achievement is earned
      // Add new achievement to all credit
      const achID = sharedAchCriteria[criteriaID]['achievement'];
      if (newCount === threshold && credit && !credit?.[achID]) credit[achID] = date;

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
          addCharProgValues(Number(charID), Number(criteriaID), newCount, date);
        }
      }

      // Add shared achievement progress
      addSharedProgValues(Number(acctID), Number(criteriaID), newCount, date);
    }

    // Add all Loremaster progress
    const allLMProg = loremaster(completedQuests, templateQuests, loremasterProg);
    const mainLMProg = allLMProg.mainProg;
    const subLMProg = allLMProg.subProg;
    const allianceLMProg = subLMProg.alliance;
    const hordeLMProg = subLMProg.horde;

    // Add credit for Loremaster achievements if they exceed threshold
    if (credit) {
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
    }

    // Add Loremaster progress for each character
    for (const charID in chars) {
      const char = chars[charID];
      const faction = checkFaction(char.race);
      if (faction === 'alliance') {
        for (const criteriaID in allianceLMProg) {
          const count = allianceLMProg[criteriaID]['counter'];
          const date = allianceLMProg[criteriaID]['date'];
          addCharProgValues(Number(charID), Number(criteriaID), count, date);
        }
      } else if (faction === 'horde') {
        for (const criteriaID in hordeLMProg) {
          const count = hordeLMProg[criteriaID]['counter'];
          const date = hordeLMProg[criteriaID]['date'];
          addCharProgValues(Number(charID), Number(criteriaID), count, date);
        }
      }
    }

    // Use length of credit for Complete {X} Quests achievement chain
    for (const criteriaID in questAchCriteria) {
      let completedQuestCount = completedQuests ? Object.keys(completedQuests).length : 0;
      const criteria = questAchCriteria[criteriaID];
      const date = new Date().getTime() / 1000;

      // Ensure progress counter doesn't exceed threshold
      const threshold = criteria.threshold;
      if (completedQuestCount > threshold) completedQuestCount = threshold;

      // Check to see if new achievement is earned
      // Add new achievement to all credit
      const achID = criteria.achievement.toString();
      const thresholdMet = completedQuestCount === threshold;
      if (thresholdMet && credit && !credit?.[achID]) credit[achID] = date;

      // Add individual character progress
      for (const charID in chars) {
        addCharProgValues(Number(charID), Number(criteriaID), completedQuestCount, date);
      }
    }

    // Add new credit to account
    dbValues['newAcctData'][acctID]['credit'] = credit;
  }

  return dbValues;
}
