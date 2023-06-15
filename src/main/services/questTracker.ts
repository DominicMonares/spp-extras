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
  ConnectionPool,
} from 'types';

const questTracker = async (xpac: Expansion) => {
  send('Starting Quest Tracker service');

  // ----------------------------------------------------------------
  // Connect to all databases needed
  // ----------------------------------------------------------------

  let realmdDB: Connection;
  let charactersDB: Connection;
  let mangosDB: Connection;
  const connectionPool: ConnectionPool = [];

  try {
    realmdDB = await connect(xpac, 'realmd');
    connectionPool.push([realmdDB, 'realmd']);
  } catch (err) {
    throw err;
  }

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
  // Fetch and format all data
  // ----------------------------------------------------------------

  // Accounts
  let acctIDs: number[] = [];
  try {
    const rawAccounts: RawAccounts = await selAccts(realmdDB, false);
    acctIDs = rawAccounts.map(a => a.id);
  } catch (err) {
    await disconnect(connectionPool, xpac);
    throw err;
  }

  if (!acctIDs.length) {
    send('No accounts found!');
    return { characters: {}, completedQuests: {}, templateQuests: {} };
  }

  // Characters
  let charIDs: number[] = [];
  let characters: AllCharacters;
  try {
    const rawCharacters: RawCharacters = await selChars(charactersDB, xpac, acctIDs);
    charIDs = rawCharacters.map(c => c.guid);
    characters = formatChars(rawCharacters);
  } catch (err) {
    await disconnect(connectionPool, xpac);
    throw err;
  }

  if (!charIDs.length) {
    send('No characters found!');
    return { characters: {}, completedQuests: {}, templateQuests: {} };
  }

  // Completed Quests
  let completedQuests: CompletedQuests = {};
  try {
    // Regular
    const rawCompletedReg: RawComplRegQuests = await selCompletedRegQuests(
      charactersDB,
      charIDs,
    );

    // Daily
    let rawCompletedDaily: RawComplRepeatQuests = [];
    if (xpac !== 'classic') {
      rawCompletedDaily = await selCompletedDailyQuests(charactersDB, charIDs);
    }

    // Weekly
    const rawCompletedWeekly: RawComplRepeatQuests = await selCompletedWeeklyQuests(
      charactersDB,
      charIDs,
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
      rawCompletedMonthly,
    );
  } catch (err) {
    await disconnect(connectionPool, xpac);
    throw err;
  }

  // Template Quests
  let templateQuests: AllTemplateQuests;
  try {
    const rawTemplateQuests: RawTemplateQuests = await selTemplateQuests(mangosDB);
    templateQuests = formatTemplateQuests(rawTemplateQuests);
  } catch (err) {
    await disconnect(connectionPool, xpac);
    throw err;
  }

  // ----------------------------------------------------------------
  // Disconnect from all databases then return Quest Tracker data
  // ----------------------------------------------------------------

  await disconnect(connectionPool, xpac);
  send('Quest Tracker service finished running!');

  return {
    characters,
    completedQuests,
    templateQuests,
  };
}

export default questTracker;
