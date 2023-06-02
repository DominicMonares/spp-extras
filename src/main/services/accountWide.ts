import {
  connect,
  disconnect,
  selAccts,
  selChars,
} from '../db';
import {
  formatAcctChars,
  send,
} from '../../utils';
import {
  transferAchievements,
  transferPetsMounts,
  transferReputations
} from '../transfers';
import {
  AccountCharacters,
  AccountWideSettings,
  Connection,
  RawAccounts,
  RawCharacters,
  Reply,
} from '../../types';

const accountWide = async (settings: AccountWideSettings, reply: Reply) => {
  const { xpac, petsMounts, reputations, achievements, bots } = settings;
  if (!xpac) return send('No expansion selected... How did you get here?!', reply);
  send('Starting account-wide data transfers...', reply);

  // ----------------------------------------------------------------
  // Connect to all databases needed
  // ----------------------------------------------------------------

  let realmdDB: Connection;
  let charactersDB: Connection;
  let mangosDB: Connection;

  try {
    realmdDB = await connect(xpac, 'realmd', reply);
  } catch (err) {
    return;
  }

  try {
    charactersDB = await connect(xpac, 'characters', reply);
  } catch (err) {
    return;
  }

  try {
    mangosDB = await connect(xpac, 'mangos', reply);
  } catch (err) {
    return;
  }

  // ----------------------------------------------------------------
  // Fetch and format account and character data
  // ----------------------------------------------------------------

  // Accounts
  let acctIDs: number[] = [];
  let rawAccts: RawAccounts = [];
  try {
    rawAccts = await selAccts(realmdDB, bots, reply);
    acctIDs = rawAccts.map(a => a.id);
  } catch (err) {
    throw err;
  }

  // Characters
  let charIDs: number[] = [];
  let rawChars: RawCharacters = [];
  let acctChars: AccountCharacters = {};
  try {
    rawChars = await selChars(charactersDB, xpac, acctIDs, reply);
    charIDs = rawChars.map(c => c.guid);
    acctChars = formatAcctChars(rawAccts, rawChars);
  } catch (err) {
    throw err;
  }

  // ----------------------------------------------------------------
  // Run transfers
  // ----------------------------------------------------------------

  if (achievements) try {
    await transferAchievements(acctChars, acctIDs, charIDs, reply, charactersDB, mangosDB);
  } catch (err) {
    throw err;
  }

  if (petsMounts) try {
    await transferPetsMounts(acctChars, charIDs, reply, charactersDB, mangosDB);
  } catch (err) {
    throw err;
  }

  if (reputations) try {
    await transferReputations(acctChars, charIDs, reply, charactersDB)
  } catch (err) {
    throw err;
  }

  // ----------------------------------------------------------------
  // Disconnect from all databases
  // ----------------------------------------------------------------

  try {
    await disconnect(realmdDB, xpac, 'realmd', reply);
  } catch (err) {
    return;
  }

  try {
    await disconnect(charactersDB, xpac, 'characters', reply);
  } catch (err) {
    return;
  }

  try {
    await disconnect(mangosDB, xpac, 'mangos', reply);
  } catch (err) {
    return;
  }

  send('Account-wide data transfers complete!', reply);
  send('This tool can be closed now.', reply);
}

export default accountWide;
