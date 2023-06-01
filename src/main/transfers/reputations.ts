import { selCharRep } from '../db';
import {
  createReputationValues,
  formatCharSpellData,
  send,
} from '../../utils';

export const transferReputations = async (
  acctChars: any,
  acctIDs: any,
  charIDs: any,
  reply: any,
  charactersDB: any,
  mangosDB: any,
) => {
  // Fetch and format character reputations
  let reputations: any = {}; // TEMP ANY
  try {
    const rawReputations = await selCharRep(charactersDB, charIDs, reply);
    reputations = formatCharSpellData(rawReputations);
  } catch (err) {
    throw err;
  }

  // Create new DB values
  let reputationValues: any = []; // TEMP ANY
  try {
    send('Creating new character reputation standing DB values...', reply);
    reputationValues = createReputationValues(
      acctChars,
      reputationValues
    );
    send('New character reputation standing DB values created!', reply);
  } catch (err) {
    const errMsg = `Failed to create new character reputation standing DB values!\n${err}`;
    send(errMsg, reply);
    throw err;
  }


  // Run query to save new character reputation standing values

}
