export const selAccts = async (conn: any, bots: boolean) => { // TEMP ANY
  const [rows] = await conn.execute(`
    SELECT * FROM account
    ${!bots ? 'WHERE username NOT LIKE "%RNDBOT%;"' : ''}
  `);
  return rows;
}
