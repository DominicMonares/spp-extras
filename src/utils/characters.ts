import { AllCharacters, Race, RawCharacters } from 'types';

// Determine faction based on race IDs
export const checkFaction = (raceID: Race) => {
  const alliance = [1, 3, 4, 7, 11];
  return alliance.includes(raceID) ? 'alliance' : 'horde';
}

// Organize characters by faction
export const formatChars = (characters: RawCharacters) => {
  const all: AllCharacters = { alliance: {}, horde: {} };
  characters.forEach(char => {
    const faction = checkFaction(char.race);
    all[faction][char.guid] = char;
  });
  return all;
}
