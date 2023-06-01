import { connect, disconnect } from '../db/connection';
import { selAccts } from '../db/realmd';
import {
  selChars,
  selCompletedDailyQuests,
  selCompletedMonthlyQuests,
  selCompletedRegQuests,
  selCompletedWeeklyQuests
} from '../db/characters';
import {
  formatChars,
  formatCompletedQuests,
  formatTemplateQuests,
  send
} from '../../utils';
import { selAllTemplateQuests } from '../db/mangos';

const questTracker = async (xpac: any) => { // TEMP TYPE
  send('Starting Quest Tracker service');

  // ----------------------------------------------------------------
  // Connect to all databases needed
  // ----------------------------------------------------------------

  let realmdDB: any; // TEMP ANY
  let charactersDB: any; // TEMP ANY
  let mangosDB: any; // TEMP ANY

  try {
    realmdDB = await connect(xpac, 'realmd');
  } catch (err) {
    throw err;
  }

  try {
    charactersDB = await connect(xpac, 'characters');
  } catch (err) {
    throw err;
  }

  try {
    mangosDB = await connect(xpac, 'mangos');
  } catch (err) {
    throw err;
  }

  // ----------------------------------------------------------------
  // Fetch and format all data
  // ----------------------------------------------------------------

  // Accounts
  let acctIDs: any = []; // TEMP ANY
  try {
    const rawAccounts = await selAccts(realmdDB, false);
    acctIDs = rawAccounts.map((a: any) => a.id); // TEMP ANY
  } catch (err) {
    throw err;
  }

  // Characters
  let charIDs: any = []; // TEMP ANY
  let characters: any; // TEMP ANY
  try {
    const rawCharacters = await selChars(charactersDB, xpac, acctIDs);
    charIDs = rawCharacters.map((c: any) => c.guid); // TEMP ANY
    characters = formatChars(rawCharacters);
  } catch (err) {
    throw err;
  }

  // Completed Quests
  let completedQuests: any = {} // TEMP ANY
  try {
    // Regular
    const rawCompletedReg: any = await selCompletedRegQuests(charactersDB, charIDs); // TEMP ANY

    // Daily
    let rawCompletedDaily: any = []; //TEMP ANY
    if (xpac !== 'classic') {
      rawCompletedDaily = await selCompletedDailyQuests(charactersDB, charIDs);
    }

    // Weekly
    const rawCompletedWeekly: any = await selCompletedWeeklyQuests(charactersDB, charIDs); // TEMP ANY

    // Monthly
    let rawCompletedMonthly: any = []; // TEMP ANY
    if (xpac !== 'classic') {
      rawCompletedMonthly = await selCompletedMonthlyQuests(charactersDB, charIDs);
    }

    completedQuests = formatCompletedQuests(
      rawCompletedReg,
      rawCompletedDaily,
      rawCompletedWeekly,
      rawCompletedMonthly
    );
  } catch (err) {
    throw err
  }

  // Template Quests
  let templateQuests: any; // TEMP ANY
  try {
    const rawTemplateQuests = await selAllTemplateQuests(mangosDB);
    templateQuests = formatTemplateQuests(rawTemplateQuests);
  } catch (err) {
    throw err;
  }

  // ----------------------------------------------------------------
  // Disconnect from all databases
  // ----------------------------------------------------------------

  try {
    await disconnect(realmdDB, xpac, 'realmd');
  } catch (err) {
    throw err;
  }

  try {
    await disconnect(charactersDB, xpac, 'characters');
  } catch (err) {
    throw err;
  }

  try {
    await disconnect(mangosDB, xpac, 'mangos');
  } catch (err) {
    throw err;
  }

  // ----------------------------------------------------------------
  // Return response
  // ----------------------------------------------------------------

  send('Quest Tracker service finished running!');

  const response: any = { // TEMP ANY
    characters,
    completedQuests,
    templateQuests,
  };

  return response;
}

export default questTracker;
