// Determine faction based on race IDs
export const checkFaction = (raceID: any) => { // TEMP ANY
  const alliance = [1, 3, 4, 7, 11];
  return alliance.includes(raceID) ? 'alliance' : 'horde';
}

// Create list of character IDs to use for DB queries
export const createCharIDs = (accounts: any) => { // TEMP ANY
  const charIDs: any = []; // TEMP ANY
  for (const acctID in accounts) {
    const account = accounts[acctID];
    const characters = account.characters;
    const mergedChars = { ...characters.alliance, ...characters.horde };
    for (const charID in mergedChars) charIDs.push(Number(charID));
  }

  return charIDs;
}
