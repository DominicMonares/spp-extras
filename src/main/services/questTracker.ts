import { connect, disconnect } from '../db/connection';
import { selAccts } from '../db/queries/realmd';
import { selChars } from '../db/queries/characters';

const questTracker = async (xpac: any, bots: boolean) => { // TEMP TYPE
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
    realmdDB = await connect(xpac, 'characters');
  } catch (err) {
    throw err;
  }

  try {
    realmdDB = await connect(xpac, 'mangos');
  } catch (err) {
    throw err;
  }

  // ----------------------------------------------------------------
  // Fetch and format all data
  // ----------------------------------------------------------------

  let accounts: any; // TEMP ANY
  try {
    accounts = await selAccts(realmdDB, bots);
  } catch (err) {
    throw err;
  }

  const acct_ids = accounts.map((a: any) => a.id); // TEMP ANY
  let characters: any // TEMP ANY
  try {
    characters = await selChars(charactersDB, xpac, acct_ids);
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
    await charactersDB.end();
  } catch (err) {
    throw err;
  }

  try {
    await mangosDB.end();
  } catch (err) {
    throw err;
  }
}

export default questTracker;
