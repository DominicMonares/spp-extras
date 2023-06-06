import {
  formatAchCredit,
  formatAchProg,
  formatAchRewards,
  formatAllAcctData,
  formatRewItemCharges,
  checkFactionAch,
} from '../../src/utils';
import achCredit from '../samples/formattedData/achCredit.json';
import achProg from '../samples/formattedData/achProgress.json';
import achRewards from '../samples/formattedData/achRewards.json';
import allAccountData from '../samples/main/allAccountData.json';
import completedQuests from '../samples/formattedData/completedQuests.json';
import itemCharges from '../samples/formattedData/itemCharges.json';
import playerSortedAccounts from '../samples/formattedData/playerSortedAccounts.json';
import rawAchCredit from '../samples/rawData/rawAchCredit.json';
import rawAchProg from '../samples/rawData/rawAchProgress.json';
import rawAchRewards from '../samples/rawData/rawAchRewards.json';
import rawItemCharges from '../samples/rawData/rawItemCharges.json';

describe('formatAllAcctData', () => {
  it('Should combine all character data into one main object', () => {
    const acctProg = achProg.account;
    const charProg = achProg.character;
    const result = formatAllAcctData(
      playerSortedAccounts,
      achCredit,
      charProg,
      acctProg,
      completedQuests,
    );
    const expected = allAccountData;
    expect(result).toStrictEqual(expected);
  });
});

describe('formatAchCredit', () => {
  it('Should return achievement credit organized by character', () => {
    const result = formatAchCredit(rawAchCredit);
    const expected = achCredit;
    expect(result).toStrictEqual(expected);
  });
});

describe('formatAchProg', () => {
  it('Should return achievement progress organized by account', () => {
    const rawAcctProg = rawAchProg.account;
    const result = formatAchProg('shared', rawAcctProg);
    const expected = achProg.account;
    expect(result).toStrictEqual(expected);
  });

  it('Should return achievement progress organized by character', () => {
    const rawCharProg = rawAchProg.character;
    const result = formatAchProg('char', rawCharProg);
    const expected = achProg.character;
    expect(result).toStrictEqual(expected);
  });
});

describe('formatAchRewards', () => {
  it('Should return achievement rewards organized by achievement', () => {
    const result = formatAchRewards(rawAchRewards);
    const expected = achRewards;
    expect(result).toStrictEqual(expected);
  });
});

describe('formatRewItemCharges', () => {
  it('Should return item charges for each reward item', () => {
    const result = formatRewItemCharges(rawItemCharges);
    const expected = itemCharges;
    expect(result).toStrictEqual(expected);
  });
});

describe('checkFactionAch', () => {
  it('Should return true and achID if achievement is neutral', () => {
    const result = checkFactionAch(2136, 'horde');
    const expected = [true, 2136];
    expect(result).toStrictEqual(expected);
  });

  it('Should return true and achID if achievement and char factions match', () => {
    const result = checkFactionAch(1173, 'horde');
    const expected = [true, 1173];
    expect(result).toStrictEqual(expected);
  });

  it('Should return true and alt achID if achievement and char factions don\'t match and alt exists', () => {
    const result = checkFactionAch(1173, 'alliance');
    const expected = [true, 1172];
    expect(result).toStrictEqual(expected);
  });

  it('Should return false and achID if achievement and char factions don\'t match and alt doesn\'t exist', () => {
    const result = checkFactionAch(1405, 'alliance');
    const expected = [false, 1405];
    expect(result).toStrictEqual(expected);
  });
});
