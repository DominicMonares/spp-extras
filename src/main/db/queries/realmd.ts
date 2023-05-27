export const selAccts = async (conn: any, bots: boolean) => { // TEMP ANY
  try {
    console.log('Fetching account data...');
    const [rows] = await conn.execute(`
      SELECT * FROM account
      ${!bots ? 'WHERE username NOT LIKE "%RNDBOT%;"' : ''}
    `);
    console.log('Account data fetched!');
    return rows;
  } catch (err) {
    err = `Failed to fetch account data!\n${err}`;
    console.error(err);
    throw err;
  }
}
