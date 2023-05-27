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

// Combine player accounts into a single account separate from bots
export const formatPlayerAccts = (accounts: any) => { // TEMP ANY
  const playerAccts: any = []; // TEMP ANY
  const mergedAcct: any = { // TEMP ANY
    username: 'player_accts',
    playerAccts: [],
    characters: { alliance: {}, horde: {} },
  }

  for (const acctID in accounts) {
    const acct = accounts[acctID];
    if (!acct.username.includes('RNDBOT')) {
      playerAccts.push(acctID);
      const chars = acct.characters;
      const allianceChars = mergedAcct.characters.alliance;
      const hordeChars = mergedAcct.characters.horde;
      const newAllianceChars = { ...allianceChars, ...chars.alliance };
      const newHordeChars = { ...hordeChars, ...chars.horde };
      mergedAcct.characters.alliance = newAllianceChars;
      mergedAcct.characters.horde = newHordeChars;
    }
  }

  // Add merged account to characters object
  mergedAcct.playerAccts = playerAccts;
  accounts['0'] = mergedAcct; // Use account 0 for all chars

  // Remove individual player accounts for main store
  playerAccts.forEach((a: any) => delete accounts[a]); // TEMP ANY

  return accounts;
}

// Organize characters by account
export const formatAcctsChars = (accounts: any, characters: any) => { // TEMP ANY
  const all: any = {} // TEMP ANY
  accounts.forEach((account: any) => { // TEMP ANY
    all[account.id.toString()] = {
      username: account.username,
      characters: { alliance: {}, horde: {} },
    };
  });

  characters.forEach((char: any) => { // TEMP ANY
    const accountID = char.account.toString();
    const faction = checkFaction(char.race);
    all[accountID]['characters'][faction][char.guid.toString()] = char;
  });

  return Object.keys(all).length ? formatPlayerAccts(all) : all;
}
