import {
  checkFaction,
  createCharIDs,
  formatAcctsChars
} from '../../src/main/utils/characters';

import allAccountsChars from '../samples/formattedData/allAccountsChars.json';
import playerAccountsChars from '../samples/formattedData/playerAccountsChars.json';
import rawAllCharacters from '../samples/rawData/rawAllCharacters.json';
import rawPlayerCharacters from '../samples/rawData/rawPlayerCharacters.json';

describe('checkFaction', () => {
  it('Should return "alliance" if Alliance ID provided', () => {
    const result = checkFaction(11);
    const expected = 'alliance';
    expect(result).toStrictEqual(expected);
  });

  it('Should return "horde" if Horde ID provided', () => {
    const result = checkFaction(5);
    const expected = 'horde';
    expect(result).toStrictEqual(expected);
  });
});

describe('createCharIDs', () => {
  it('Should return list of char ID numbers', () => {
    const result = createCharIDs(allAccountsChars);
    const expected = [5263, 1001, 4501, 79411, 6000, 6001];
    expect(result).toStrictEqual(expected);
  });
});

describe('formatAcctsChars', () => {
  it('Should return all accounts with player accounts combined into one account with random bots included', () => {
    const rawAccounts = [
      {'id': 500, 'username': 'ACCOUNT1'},
      {'id': 501, 'username': 'ACCOUNT2'},
      {'id': 502, 'username': 'RNDBOT2'}
    ];
    const result = formatAcctsChars(rawAccounts, rawAllCharacters);
    const expected = allAccountsChars;
    expect(result).toStrictEqual(expected);
  });

  it('Should return all accounts with player accounts combined into one account without random bots included', () => {
    const rawAccounts = [
      {'id': 500, 'username': 'ACCOUNT1'},
      {'id': 501, 'username': 'ACCOUNT2'}
    ];
    const result = formatAcctsChars(rawAccounts, rawPlayerCharacters);
    const expected = playerAccountsChars;
    expect(result).toStrictEqual(expected);
  });

  it('Should return empty characters dict if no characters provided', () => {
    const result = formatAcctsChars([], []);
    const expected = {};
    expect(result).toStrictEqual(expected);
  });
});
