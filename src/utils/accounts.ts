import { checkFaction } from "./characters";

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
export const formatAcctChars = (accounts: any, characters: any) => { // TEMP ANY
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
    all[accountID]['characters'][faction][char.guid] = char;
  });

  return Object.keys(all).length ? formatPlayerAccts(all) : all;
}
