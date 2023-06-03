import { selCharRep, updCharRep } from '../db';
import {
  createReputationValues,
  formatReputations,
  send,
} from '../../utils';
import {
  AccountCharacters,
  AllReputations,
  Connection,
  RawReputations,
  Reply,
  ReputationValues
} from 'types';

export const transferReputations = async (
  acctChars: AccountCharacters,
  charIDs: number[],
  charactersDB: Connection,
  reply: Reply,
) => {
  // Fetch and format character reputations
  let reputations: AllReputations = {};
  try {
    const rawReputations: RawReputations = await selCharRep(
      charactersDB,
      charIDs,
      reply
    );
    reputations = formatReputations(rawReputations);
  } catch (err) {
    throw err;
  }

  // Create new DB values
  let reputationValues: ReputationValues = [];
  try {
    send('Creating new character reputation standing DB values...', reply);
    reputationValues = createReputationValues(
      acctChars,
      reputations
    );
    send('New character reputation standing DB values created!', reply);
  } catch (err) {
    const errMsg = `Failed to create new character reputation standing DB values!\n${err}`;
    send(errMsg, reply);
    throw err;
  }

  // Run query to save new character reputation standing values
  if (reputationValues.length) try {
    await updCharRep(charactersDB, reputationValues, reply);
  } catch (err) {
    throw err;
  }
}
