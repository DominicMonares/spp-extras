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
  ConnectionPool,
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
  const connectionPool: ConnectionPool = [];

  realmdDB = await connect(xpac, 'realmd');
  connectionPool.push([realmdDB, 'realmd']);

  try {
    charactersDB = await connect(xpac, 'characters');
    connectionPool.push([charactersDB, 'characters']);
  } catch (err) {
    await disconnect(connectionPool, xpac);
    throw err;
  }

  try {
    mangosDB = await connect(xpac, 'mangos');
    connectionPool.push([mangosDB, 'mangos']);
  } catch (err) {
    await disconnect(connectionPool, xpac);
    throw err;
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
    await disconnect(connectionPool, xpac);
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
    await disconnect(connectionPool, xpac);
    throw err;
  }

  // ----------------------------------------------------------------
  // Run transfers
  // ----------------------------------------------------------------

  if (achievements) try {
    await transferAchievements(acctChars, acctIDs, charIDs, charactersDB, mangosDB, reply);
  } catch (err) {
    await disconnect(connectionPool, xpac);
    throw err;
  }

  if (petsMounts) try {
    await transferPetsMounts(acctChars, charIDs, charactersDB, mangosDB, reply);
  } catch (err) {
    await disconnect(connectionPool, xpac);
    throw err;
  }

  if (reputations) try {
    await transferReputations(acctChars, charIDs, charactersDB, reply)
  } catch (err) {
    await disconnect(connectionPool, xpac);
    throw err;
  }

  // ----------------------------------------------------------------
  // Disconnect from all databases
  // ----------------------------------------------------------------

  await disconnect(connectionPool, xpac);
  send('Account-wide data transfers complete!', reply);
  send('This tool can be closed now.', reply);
}

export default accountWide;
