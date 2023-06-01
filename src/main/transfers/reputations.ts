import { selCharRep } from '../db';
import {
  createReputationValues,
  formatCharSpellData,
  send,
} from '../../utils';
import { ReputationValues } from 'types';

export const transferReputations = async (
  acctChars: any,
  charIDs: any,
  reply: any,
  charactersDB: any
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
  let reputationValues: ReputationValues = [];
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
