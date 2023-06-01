import _maxRaceReps from '../../data/reputations/maxRaceReps.json';
import _reputationTemplate from '../../data/reputations/reputationTemplate.json';

interface MaxRaceReps { // REFACTOR AND MOVE TO TYPE FILE
  [key: string]: {
    [key: string]: any;
  }
}
const maxRaceReps = _maxRaceReps as MaxRaceReps;
interface ReputationTemplate { // REFACTOR AND MOVE TO TYPE FILE
  [key: string]: {
    name: string;
    charFaction: string;
  }
}
const reputationTemplate = _reputationTemplate as ReputationTemplate;

// Share reputation standing between characters
export const createReputationValues = (acctChars: any, reputations: any) => { // TEMP ANYS
  const dbValues: any = []; // TEMP ANY
  for (const acctID in acctChars) {
    const account = acctChars[acctID];
    const characters = account.characters;
    const mergedChars = { ...characters.alliance, ...characters.horde };
    const acctStanding: any = { // TEMP ANY
      alliance: {},
      horde: {},
      neutral: {},
    }

    // Add the highest standing for each rep to acct_standing tracker
    for (const charID in mergedChars) {
      const charReps = reputations[charID];
      if (charReps) {
        for (const factionID in charReps) {
          const standing = charReps[factionID];
          if (!reputationTemplate[factionID]) continue;
          const charFaction = reputationTemplate[factionID]['charFaction'];
          const existingStanding = acctStanding[charFaction][factionID];
          const higherStanding = existingStanding ? standing > existingStanding : false;
          if (!existingStanding) acctStanding[charFaction][factionID] = standing;
          else if (higherStanding) acctStanding[charFaction][factionID] = standing;
        }
      }
    }

    // Create arguments for new reputation standings
    for (const charFaction in characters) {
      const factionChars = characters[charFaction];
      for (const charID in factionChars) {
        const char = factionChars[charID];
        const race = char.race;
        const mergedAcctStanding = {
          ...acctStanding[charFaction],
          ...acctStanding.neutral
        };
        const repsExist = reputations[charID];
        const charReps = repsExist ? reputations[charID] : {};
        for (const repID in mergedAcctStanding) {
          let highestStanding = mergedAcctStanding[repID];
          const charRepsExist = charReps[repID];
          const charStanding = charRepsExist ? charReps[repID] : 0;

          // Prevent race/city rep overflow
          // Race/city reputations vary depending on char race.
          // Ex: Orcs start at 1000/6000 with Org and 100/6000 with Thunderbluff
          // This causes in-game counters to go higher than 999/1000 for these reps
          // These reps will also not reflect 1:1 in-game for different races
          // Ex: Orc with 999/1000 Org will transfer to 18499/21000 for Undead char
          // This ONLY applies to the 10 char race factions
          // No plans to implement a workaround for this
          if (maxRaceReps[race][repID]) {
            const raceRep = maxRaceReps[race][repID];
            const maxRaceStanding = raceRep.maxStanding;
            if (highestStanding > maxRaceStanding) highestStanding = maxRaceStanding;
          }

          // Add argument for higher standings
          if (highestStanding > charStanding) {
            dbValues.push({
              guid: Number(charID),
              faction: Number(repID),
              standing: highestStanding,
            });
          }
        }
      }
    }
  }

  return dbValues;
}
