export const selAccts = async (conn: any, bots: boolean) => { // TEMP ANY
  try {
    const sql = `
      SELECT * FROM account
      ${!bots ? 'WHERE username NOT LIKE "%RNDBOT%;"' : ''}
    `;

    console.log('Fetching account data...');
    const [rows] = await conn.execute(sql);
    console.log('Account data fetched!');
    return rows;
  } catch (err) {
    err = `Failed to fetch account data!\n${err}`;
    console.error(err);
    throw err;
  }
}
