import { checkFaction, formatAcctChars, formatChars } from '../../src/utils';
import allAccountsChars from '../samples/formattedData/allAccountsChars.json';
import factionSortedChars from '../samples/formattedData/factionSortedChars.json';
import playerAccountsChars from '../samples/formattedData/playerAccountsChars.json';
import _rawAllCharacters from '../samples/rawData/rawAllCharacters.json';
import _rawPlayerCharacters from '../samples/rawData/rawPlayerCharacters.json';
import { RawCharacters } from 'types';

const rawAllCharacters = _rawAllCharacters as RawCharacters;
const rawPlayerCharacters = _rawPlayerCharacters as RawCharacters;

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

describe('formatChars', () => {
  it('Should sort characters by faction', () => {
    const result = formatChars(rawAllCharacters);
    expect(result).toStrictEqual(factionSortedChars);
  });
});

describe('formatAcctsChars', () => {
  it('Should return all accounts with player accounts combined into one account with random bots included', () => {
    const rawAccounts = [
      {'id': 500, 'username': 'ACCOUNT1'},
      {'id': 501, 'username': 'ACCOUNT2'},
      {'id': 502, 'username': 'RNDBOT2'}
    ];
    const result = formatAcctChars(rawAccounts, rawAllCharacters);
    const expected = allAccountsChars;
    expect(result).toStrictEqual(expected);
  });

  it('Should return all accounts with player accounts combined into one account without random bots included', () => {
    const rawAccounts = [
      {'id': 500, 'username': 'ACCOUNT1'},
      {'id': 501, 'username': 'ACCOUNT2'}
    ];
    const result = formatAcctChars(rawAccounts, rawPlayerCharacters);
    const expected = playerAccountsChars;
    expect(result).toStrictEqual(expected);
  });

  it('Should return empty characters dict if no characters provided', () => {
    const result = formatAcctChars([], []);
    const expected = {};
    expect(result).toStrictEqual(expected);
  });
});
