// ----------------------------------------------------------------
// Accounts
// ----------------------------------------------------------------

export const selAccts = async (conn: any, bots: boolean, reply?: any) => { // TEMP ANY
  const sql = `
    SELECT id, username FROM account
    ${!bots ? 'WHERE username NOT LIKE "%RNDBOT%"' : ''}
  `;

  try {
    const startMsg = 'Fetching account data...';
    if (reply) reply(startMsg);
    else console.log(startMsg);
    const [rows] = await conn.query(sql);
    const successMsg = 'Account data fetched!';
    if (reply) reply(successMsg);
    else console.log(successMsg);;
    return rows;
  } catch (err) {
    const errMsg = `Failed to fetch account data!\n${err}`;
    if (reply) reply(errMsg);
    else console.log(errMsg);
    throw err;
  }
}
