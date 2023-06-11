import { createReputationValues, formatReputations } from 'utils';
import { AccountCharacters } from 'types';
import _allAccountsChars from '../samples/formattedData/allAccountsChars.json';
import characterReputations from '../samples/formattedData/characterReputations.json';
import rawCharacterReps from '../samples/rawData/rawCharacterReps.json';
import transferredReps from '../samples/main/transferredReps.json';

const allAccountsChars = _allAccountsChars as AccountCharacters;

describe('formatReputations', () => {
  it('should return reputations dict sorted by character', () => {
    const result = formatReputations(rawCharacterReps);
    const expected = characterReputations;
    expect(result).toStrictEqual(expected);
  });
});

describe('createReputationValues', () => {
  it('should return array of new rep progress arguments', () => {
    const result = createReputationValues(allAccountsChars, characterReputations);
    const expected = transferredReps;
    expect(result).toStrictEqual(expected);
  });
});
