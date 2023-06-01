import {
  connect,
  disconnect,
  selAccts,
  selAllTemplateQuests,
  selChars,
  selCompletedDailyQuests,
  selCompletedMonthlyQuests,
  selCompletedRegQuests,
  selCompletedWeeklyQuests,
} from '../db';
import {
  formatAcctChars,
  formatChars,
  formatCompletedQuests,
  formatTemplateQuests,
  send,
} from '../../utils';
import {
  transferAchievements,
  transferPetsMounts,
  transferReputations
} from '../transfers';

const accountWide = async (reply: any, settings: any) => { // TEMP ANY
  const { xpac, petsMounts, reputations, achievements, bots } = settings;
  send('Starting account-wide data transfers...', reply);

  // ----------------------------------------------------------------
  // Connect to all databases needed
  // ----------------------------------------------------------------

  let realmdDB: any; // TEMP ANY
  let charactersDB: any; // TEMP ANY
  let mangosDB: any; // TEMP ANY

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
    // DISCONNECT FROM ALL IN ERRORS HERE?
    return;
  }

  // ----------------------------------------------------------------
  // Fetch and format account and character data
  // ----------------------------------------------------------------

  // Accounts
  let rawAccts: any = []; // TEMP ANY
  let acctIDs: any = []; // TEMP ANY
  try {
    rawAccts = await selAccts(realmdDB, bots, reply);
    acctIDs = rawAccts.map((a: any) => a.id); // TEMP ANY
  } catch (err) {
    throw err;
  }

  // Characters
  let rawChars: any = []; // TEMP ANY
  let charIDs: any = []; // TEMP ANY
  let acctChars: any = {}; // TEMP ANY
  try {
    rawChars = await selChars(charactersDB, xpac, acctIDs, reply);
    charIDs = rawChars.map((c: any) => c.guid); // TEMP ANY
    acctChars = formatAcctChars(rawAccts, rawChars);
  } catch (err) {
    throw err;
  }

  // ----------------------------------------------------------------
  // Run transfers
  // ----------------------------------------------------------------

  if (achievements) try {
    await transferAchievements(acctChars, charIDs, reply, charactersDB, mangosDB);
  } catch (err) {
    throw err;
  }

  if (petsMounts) try {
    await transferPetsMounts(xpac, acctChars, charIDs, reply, charactersDB, mangosDB);
  } catch (err) {
    throw err;
  }

  if (reputations) try {
    await transferReputations(acctChars, charIDs, reply, charactersDB, mangosDB)
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
