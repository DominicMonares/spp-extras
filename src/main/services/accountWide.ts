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
  formatChars,
  formatCompletedQuests,
  formatTemplateQuests,
  send,
} from '../../utils';

const accountWide = async (reply: any, settings: any) => { // TEMP ANY
  const { xpac, petsMounts, reputations, achievements, bots } = settings;

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

  send('Starting account-wide data transfers...', reply);

  // ----------------------------------------------------------------
  // Fetch and format all data
  // ----------------------------------------------------------------

  // Accounts
  let acctIDs: any = []; // TEMP ANY
  try {
    const rawAccts = await selAccts(realmdDB, false);
    acctIDs = rawAccts.map((a: any) => a.id); // TEMP ANY
  } catch (err) {
    throw err;
  }

  // Characters
  let accounts: any = {}; // TEMP ANY
  let charIDs: any = []; // TEMP ANY
  try {
    const rawChars = await selChars(charactersDB, xpac, acctIDs, reply);
    charIDs = rawChars.map((c: any) => c.guid); // TEMP ANY
  } catch (err) {
    throw err;
  }

  // ----------------------------------------------------------------
  // Run transfers
  // ----------------------------------------------------------------




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
