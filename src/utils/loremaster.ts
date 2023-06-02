import _lmCriteria from '../../data/achievements/loremasterAchCriteria.json';
import {
  AchProgress,
  AllTemplateQuests,
  CompletedRegQuests,
  Faction,
  LMCriteriaTracker,
  LoremasterCriteria,
} from '../types';

const lmCriteria = _lmCriteria as LoremasterCriteria;

// See which completed quests belong to which criteria and what their counts are
export const loremaster = (
  completedQuests: CompletedRegQuests,
  templateQuests: AllTemplateQuests,
  loremasterProg: AchProgress,
) => {
  const allianceTemplQuests = templateQuests.alliance;
  const hordeTemplQuests = templateQuests.horde;
  const neutralTemplQuests = templateQuests.neutral;
  const allAllianceTemplQuests = { ...allianceTemplQuests, ...neutralTemplQuests };
  const allHordeTemplQuests = { ...hordeTemplQuests, ...neutralTemplQuests };

  // Track highest counts and most recent dates for main Loremaster quests
  // Use counts from misc Loremaster criteria as a starting point
  const allianceEK = loremasterProg['1676'];
  let allianceEKCount = allianceEK.counter;
  let allianceEKDate = allianceEK.date;
  const allianceK = loremasterProg['1678'];
  let allianceKCount = allianceK.counter;
  let allianceKDate = allianceK.date;
  const hordeEK = loremasterProg['1677'];
  let hordeEKCount = hordeEK.counter;
  let hordeEKDate = hordeEK.date;
  const hordeK = loremasterProg['1680'];
  let hordeKCount = hordeK.counter;
  let hordeKDate = hordeK.date;

  // Track criteria counts and dates for each faction/zone
  const allCriteria: LMCriteriaTracker = { alliance: {}, horde: {} };

  const countSubCriteria = (criteriaID: number, date: number, faction: Faction) => {
    if (!allCriteria[faction][criteriaID]) {
      allCriteria[faction][criteriaID] = { counter: 1, date: date };
    } else {
      allCriteria[faction][criteriaID]['counter']++;
      const existingDate = allCriteria[faction][criteriaID]['date'];
      if (existingDate < date) allCriteria[faction][criteriaID]['date'] = date;
    }
  }

  for (let questID in completedQuests) {
    const date = completedQuests[questID]['timer'] || 0;

    // Count Alliance progress
    const allianceTemplQuest = allAllianceTemplQuests[questID];
    if (allianceTemplQuest) {
      const zoneID = allianceTemplQuest.ZoneOrSort;
      const zoneCriteria = lmCriteria['alliance'][zoneID];
      const criteriaID = zoneCriteria.criteria;
      const achID = zoneCriteria.achievement;
      countSubCriteria(criteriaID, date, 'alliance');

      // Add to main counters
      if (achID === 1676) {
        allianceEKCount++;
        if (allianceEKDate < date) allianceEKDate = date
      } else if (achID === 1678) {
        allianceKCount++;
        if (allianceKDate < date) allianceKDate = date;
      }
    }

    // Count Horde progress
    const hordeTemplQuest = allHordeTemplQuests[questID];
    if (hordeTemplQuest) {
      const zoneID = hordeTemplQuest.ZoneOrSort;
      const zoneCriteria = lmCriteria['horde'][zoneID];
      const criteriaID = zoneCriteria.criteria;
      const achID = zoneCriteria.achievement;
      countSubCriteria(criteriaID, date, 'horde');

      // Add to main counters
      if (achID === 1677) {
        hordeEKCount++;
        if (hordeEKDate < date) hordeEKDate = date;
      } else if (achID === 1680) {
        hordeKCount++;
        if (hordeKDate < date) hordeKDate = date;
      }
    }
  }

  const newLoremasterProg = {
    1676: { count: allianceEKCount, date: allianceEKDate },
    1678: { count: allianceKCount, date: allianceKDate },
    1677: { count: hordeEKCount, date: hordeEKDate },
    1680: { count: hordeKCount, date: hordeKDate },
  };

  const allProgress = {
    mainProg: newLoremasterProg,
    subProg: allCriteria,
  };

  return allProgress;
}

// Some criteria for Loremaster achieves don't have matching zonerefs or have duplicates.
// Progress for these criteria are tracked separately from the other Loremaster criteria
// and are tracked like shared achievements.
// There will likely be side-effects to achievements tracked this way since there's no
// way to check for duplicate progress, but the alternative is risking achievement credit
// not being given on transfer at all.
export const miscLMCriteria = (criteriaID: number) => {
  const allianceEK = [5903, 5910, 9398, 9424, 5927, 5928, 5940, 5944, 9422];
  const allianceK = [7895, 6017, 6021, 6030];
  const hordeEK = [5955, 5962, 9425, 5979, 5980, 5992, 5996, 9423];
  const hordeK = [7899, 6112, 6116, 6125];
  if (allianceEK[criteriaID]) {
    return 1676;
  } else if (allianceK[criteriaID]) {
    return 1678;
  } else if (hordeEK[criteriaID]) {
    return 1677;
  } else if (hordeK[criteriaID]) {
    return 1680;
  }
}

// See if Loremaster achievement is earned after sharing progress
export const loremasterEarned = (achID: number, count: number) => {
  // Alliance Eastern Kingdoms
  if (achID === 1676 && count >= 700) return true;
  // Alliance Kalimdor
  else if (achID === 1678 && count >= 700) return true;
  // Horde Eastern Kingdoms
  else if (achID === 1677 && count >= 550) return true;
  // Horde Kalimdor
  else if (achID === 1680 && count >= 685) return true;
  else return false;
}
