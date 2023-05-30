import {
  createReputationArgs,
  formatReputations,
} from '../../src/utils/awReputations';
import allAccountsChars from '../samples/formattedData/allAccountsChars.json';
import characterReputations from '../samples/formattedData/characterReputations.json';
import rawCharacterReps from '../samples/rawData/rawCharacterReps.json';
import transferredReps from '../samples/main/transferredReps.json';

describe('formatReputations', () => {
  it('Should return reputations dict sorted by character', () => {
    const result = formatReputations(rawCharacterReps);
    const expected = characterReputations;
    expect(result).toStrictEqual(expected);
  });
});

describe('createReputationArgs', () => {
  it('Should return array of new rep progress arguments', () => {
    const result = createReputationArgs(allAccountsChars, characterReputations);
    const expected = transferredReps;
    expect(result).toStrictEqual(expected);
  });
});
