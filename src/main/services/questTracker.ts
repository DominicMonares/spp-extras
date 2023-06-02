import { connect, disconnect } from '../db/connection';
import {
  selAccts,
  selChars,
  selCompletedDailyQuests,
  selCompletedMonthlyQuests,
  selCompletedRegQuests,
  selCompletedWeeklyQuests,
  selTemplateQuests,
} from '../db';
import {
  formatChars,
  formatCompletedQuests,
  formatTemplateQuests,
  send,
} from '../../utils';
import {
  AllTemplateQuests,
  AllCharacters,
  CompletedQuests,
  Connection,
  Expansion,
  RawAccounts,
  RawCharacters,
  RawComplRepeatQuests,
  RawComplRegQuests,
  RawTemplateQuests,
} from '../../types';

const questTracker = async (xpac: Expansion) => {
  send('Starting Quest Tracker service');

  // ----------------------------------------------------------------
  // Connect to all databases needed
  // ----------------------------------------------------------------

  let realmdDB: Connection;
  let charactersDB: Connection;
  let mangosDB: Connection;

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
  let acctIDs: number[] = [];
  try {
    const rawAccounts: RawAccounts = await selAccts(realmdDB, false);
    acctIDs = rawAccounts.map(a => a.id);
  } catch (err) {
    throw err;
  }

  // Characters
  let charIDs: number[] = [];
  let characters: AllCharacters;
  try {
    const rawCharacters: RawCharacters = await selChars(charactersDB, xpac, acctIDs);
    charIDs = rawCharacters.map(c => c.guid);
    characters = formatChars(rawCharacters);
  } catch (err) {
    throw err;
  }

  // Completed Quests
  let completedQuests: CompletedQuests = {};
  try {
    // Regular
    const rawCompletedReg: RawComplRegQuests = await selCompletedRegQuests(
      charactersDB,
      charIDs
    );

    // Daily
    let rawCompletedDaily: RawComplRepeatQuests = [];
    if (xpac !== 'classic') {
      rawCompletedDaily = await selCompletedDailyQuests(charactersDB, charIDs);
    }

    // Weekly
    const rawCompletedWeekly: RawComplRepeatQuests = await selCompletedWeeklyQuests(
      charactersDB,
      charIDs
    );

    // Monthly
    let rawCompletedMonthly: RawComplRepeatQuests = [];
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
  let templateQuests: AllTemplateQuests;
  try {
    const rawTemplateQuests: RawTemplateQuests = await selTemplateQuests(mangosDB);
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

  const response = {
    characters,
    completedQuests,
    templateQuests,
  };

  return response;
}

export default questTracker;
