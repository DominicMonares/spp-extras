import _factionAchievements from '../../../data/achievements/factionAchievements.json';

interface FactionAchievement { // MOVE TO TYPE FOLDER
  name: string;
  faction: string;
  alt: number | null;
}
interface FactionAchievements { // MOVE TO TYPE FOLDER
  [key: string]: FactionAchievement;
}
const factionAchievements = _factionAchievements as FactionAchievements;

// Check to see if achievement is faction specific and matches char faction
// Return alt achievement ID if faction doesn't match
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
