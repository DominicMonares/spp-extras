import {
  AccountCharacters,
  AccountCharsNode,
  RawAccounts,
  RawCharacters,
} from "types";
import { checkFaction } from "./characters";

// Combine player accounts into a single account separate from bots
export const formatPlayerAccts = (acctChars: AccountCharacters) => {
  const playerAcctIDs: number[] = [];
  const mergedAcct: AccountCharsNode = {
    username: 'player_accts',
    playerAcctIDs: [],
    characters: { alliance: {}, horde: {} },
  }

  for (const acctID in acctChars) {
    const acct = acctChars[acctID];
    if (!acct.username.includes('RNDBOT')) {
      playerAcctIDs.push(Number(acctID));
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
  mergedAcct.playerAcctIDs = playerAcctIDs;
  acctChars['0'] = mergedAcct; // Use account 0 for all chars

  // Remove individual player accounts for main store
  playerAcctIDs.forEach(a => delete acctChars[a]);

  return acctChars;
}

// Organize characters by account
export const formatAcctChars = (accounts: RawAccounts, characters: RawCharacters) => {
  const all: AccountCharacters = {};
  accounts.forEach(account => {
    all[account.id] = {
      username: account.username,
      characters: { alliance: {}, horde: {} },
    };
  });

  characters.forEach(char => {
    const accountID = char.account;
    const faction = checkFaction(char.race);
    all[accountID]['characters'][faction][char.guid] = char;
  });

  return Object.keys(all).length ? formatPlayerAccts(all) : all;
}
