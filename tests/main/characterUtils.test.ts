import { checkFaction, formatAcctChars, formatChars } from 'utils';
import { RawCharacters } from 'types';
import allAccountsChars from '../samples/formattedData/allAccountsChars.json';
import factionSortedChars from '../samples/formattedData/factionSortedChars.json';
import playerAccountsChars from '../samples/formattedData/playerAccountsChars.json';
import _rawAllCharacters from '../samples/rawData/rawAllCharacters.json';
import _rawPlayerCharacters from '../samples/rawData/rawPlayerCharacters.json';

const rawAllCharacters = _rawAllCharacters as RawCharacters;
const rawPlayerCharacters = _rawPlayerCharacters as RawCharacters;

describe('checkFaction', () => {
  it('should return "alliance" if Alliance ID provided', () => {
    const result = checkFaction(11);
    const expected = 'alliance';
    expect(result).toStrictEqual(expected);
  });

  it('should return "horde" if Horde ID provided', () => {
    const result = checkFaction(5);
    const expected = 'horde';
    expect(result).toStrictEqual(expected);
  });
});

describe('formatChars', () => {
  it('should sort characters by faction', () => {
    const result = formatChars(rawAllCharacters);
    const expected = factionSortedChars;
    expect(result).toStrictEqual(expected);
  });
});

describe('formatAcctChars', () => {
  it('should return all accounts w/ player accounts combined into one account w/ random bots included', () => {
    const rawAccounts = [
      {'id': 500, 'username': 'ACCOUNT1'},
      {'id': 501, 'username': 'ACCOUNT2'},
      {'id': 502, 'username': 'RNDBOT2'},
    ];
    const result = formatAcctChars(rawAccounts, rawAllCharacters);
    const expected = allAccountsChars;
    expect(result).toStrictEqual(expected);
  });

  it('should return all accounts with player accounts combined into one account without random bots included', () => {
    const rawAccounts = [
      {'id': 500, 'username': 'ACCOUNT1'},
      {'id': 501, 'username': 'ACCOUNT2'},
    ];
    const result = formatAcctChars(rawAccounts, rawPlayerCharacters);
    const expected = playerAccountsChars;
    expect(result).toStrictEqual(expected);
  });

  it('should return empty characters dict if no characters provided', () => {
    const result = formatAcctChars([], []);
    const expected = {};
    expect(result).toStrictEqual(expected);
  });
});
