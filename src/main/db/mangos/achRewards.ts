import { send } from '../../../utils';
import { Connection, Reply } from '../../../types';

// ----------------------------------------------------------------
// Achievement Rewards
// ----------------------------------------------------------------

export const selAchRewards = async (conn: Connection, reply?: Reply) => {
  const sql = `SELECT * FROM achievement_reward`;
  try {
    const startMsg = 'Fetching achievement reward data...';
    send(startMsg, reply);
    const [rows] = await conn.query(sql);
    const successMsg = 'Achievement reward data fetched!';
    send(successMsg, reply);
    return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    const errMsg = `Failed to fetch achievement reward data!\n${err}`;
    send(errMsg, reply);
    throw errMsg;
  }
}
