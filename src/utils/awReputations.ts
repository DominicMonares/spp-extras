import _maxRaceReps from '../../data/reputations/maxRaceReps.json';
import _reputationTemplate from '../../data/reputations/reputationTemplate.json';
import {
  AccountCharacters,
  AllReputations,
  StandingsFlags,
  Faction,
  MaxRaceReps,
  ReputationTemplate,
  ReputationValues,
} from '../types';

const maxRaceReps = _maxRaceReps as MaxRaceReps;
const reputationTemplate = _reputationTemplate as ReputationTemplate;

// Share reputation standing between characters
export const createReputationValues = (
  acctChars: AccountCharacters,
  reputations: AllReputations,
) => {
  const dbValues: ReputationValues = [];
  for (const acctID in acctChars) {
    const account = acctChars[acctID];
    const characters = account.characters;
    const mergedChars = { ...characters.alliance, ...characters.horde };
    const standingsFlags: StandingsFlags = {
      alliance: {},
      horde: {},
      neutral: {},
    };

    // Add the highest standing and flags for each rep to standingsFlags tracker
    for (const charID in mergedChars) {
      const charReps = reputations[charID];
      if (charReps) {
        for (const factionID in charReps) {
          // Standing
          const standing = charReps[factionID]['standing'];
          if (!reputationTemplate[factionID]) continue;
          const charFaction = reputationTemplate[factionID]['charFaction'];
          const existingStanding = standingsFlags[charFaction][factionID]['standing'];
          const higherStanding = existingStanding ? standing > existingStanding : false;
          if (!existingStanding || higherStanding) {
            standingsFlags[charFaction][factionID]['standing'] = standing;
          }

          // Flags
          const flags = charReps[factionID]['flags'];
          const existingFlags = standingsFlags[charFaction][factionID]['flags'];
          if (!existingFlags && flags) standingsFlags[charFaction][factionID]['flags'] = flags;
        }
      }
    }

    // Create arguments for new reputation standings and flags
    for (const charFaction in characters) {
      const factionChars = characters[charFaction as Faction];
      for (const charID in factionChars) {
        const char = factionChars[charID];
        const race = char.race;
        const mergedStandingsFlags = {
          ...standingsFlags[charFaction as Faction],
          ...standingsFlags.neutral
        };
        const repsExist = reputations[charID];
        const charReps = repsExist ? reputations[charID] : {};
        for (const repID in mergedStandingsFlags) {
          const standingFlags = mergedStandingsFlags[repID];
          let highestStanding = standingFlags.standing;
          const charRepsExist = charReps[repID];
          const charStanding = charRepsExist ? charReps[repID]['standing'] : 0;

          // Prevent race/city rep overflow
          // Race/city reputations vary depending on char race.
          // Ex: Orcs start at 1000/6000 with Org and 100/6000 with Thunderbluff
          // This causes in-game counters to go higher than 999/1000 for these reps
          // These reps will also not reflect 1:1 in-game for different races
          // Ex: Orc with 999/1000 Org will transfer to 18499/21000 for Undead char
          // This ONLY applies to the 10 char race factions
          // No plans to implement a workaround for this, as it's only a minor inconvenience
          if (maxRaceReps[race][repID]) {
            const raceRep = maxRaceReps[race][repID];
            const maxRaceStanding = typeof raceRep === 'object' ? raceRep.maxStanding : 0;
            if (highestStanding > maxRaceStanding) highestStanding = maxRaceStanding;
          }

          // Add argument for higher standings
          if (highestStanding > charStanding) {
            dbValues.push({
              guid: Number(charID),
              faction: Number(repID),
              standing: highestStanding,
              flags: standingFlags.flags,
            });
          }
        }
      }
    }
  }

  return dbValues;
}
