export const selChars = async (conn: any, xpac: any, accts: any) => { // TEMP ANY
  const values = `
    guid,
    account,
    name,
    race,
    class
    ${xpac === 'wotlk' ? ', gender, knownTitles' : ''}
  `;

  const sql = `
    SELECT ${values} FROM characters
    WHERE account IN (?)
  `;

  try {
    console.log('Fetching character data...');
    const [rows] = await conn.execute(sql, [accts]);
    console.log('Character data fetched!');
    return rows;
  } catch (err) {
    err = `Failed to fetch character data!\n${err}`;
    console.error(err);
    throw err;
  }
}
