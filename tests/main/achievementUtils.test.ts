import {
  formatAchCredit,
  formatAchProg,
  formatAchRewards,
  formatAllAcctData,
  formatRewItemCharges,
  checkFactionAch,
} from 'utils';
import {
  AccountCharacters,
  RawAchRewards,
  RawCharAchProgress,
  RawSharedAchProgress,
} from 'types';
import _playerSortedAccounts from '../samples/formattedData/playerSortedAccounts.json';
import _rawAchRewards from '../samples/rawData/rawAchRewards.json';
import achCredit from '../samples/formattedData/achCredit.json';
import achProg from '../samples/formattedData/achProgress.json';
import achRewards from '../samples/formattedData/achRewards.json';
import allAccountData from '../samples/main/allAccountData.json';
import completedQuests from '../samples/formattedData/completedQuests.json';
import itemCharges from '../samples/formattedData/itemCharges.json';
import rawAchCredit from '../samples/rawData/rawAchCredit.json';
import rawAchProgress from '../samples/rawData/rawAchProgress.json';
import rawItemCharges from '../samples/rawData/rawItemCharges.json';

const playerSortedAccounts = _playerSortedAccounts as AccountCharacters;
const rawAchRewards = _rawAchRewards as RawAchRewards;
const rawCharAchProg = rawAchProgress.character as RawCharAchProgress;
const rawSharedAchProg = rawAchProgress.account as RawSharedAchProgress;

describe('formatAllAcctData', () => {
  it('should combine all character data into one main object', () => {
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
  it('should return achievement credit organized by character', () => {
    const result = formatAchCredit(rawAchCredit);
    const expected = achCredit;
    expect(result).toStrictEqual(expected);
  });
});

describe('formatAchProg', () => {
  it('should return achievement progress organized by account', () => {
    const result = formatAchProg(rawSharedAchProg);
    const expected = achProg.account;
    expect(result).toStrictEqual(expected);
  });

  it('should return achievement progress organized by character', () => {
    const result = formatAchProg(rawCharAchProg);
    const expected = achProg.character;
    expect(result).toStrictEqual(expected);
  });
});

describe('formatAchRewards', () => {
  it('should return achievement rewards organized by achievement', () => {
    const result = formatAchRewards(rawAchRewards);
    const expected = achRewards;
    expect(result).toStrictEqual(expected);
  });
});

describe('formatRewItemCharges', () => {
  it('should return item charges for each reward item', () => {
    const result = formatRewItemCharges(rawItemCharges);
    const expected = itemCharges;
    expect(result).toStrictEqual(expected);
  });
});

describe('checkFactionAch', () => {
  it('should return true and achID if achievement is neutral', () => {
    const result = checkFactionAch(2136, 'horde');
    const expected = [true, 2136];
    expect(result).toStrictEqual(expected);
  });

  it('should return true and achID if achievement and char factions match', () => {
    const result = checkFactionAch(1173, 'horde');
    const expected = [true, 1173];
    expect(result).toStrictEqual(expected);
  });

  it('should return true and alt achID if no ach/char faction match and alt exists', () => {
    const result = checkFactionAch(1173, 'alliance');
    const expected = [true, 1172];
    expect(result).toStrictEqual(expected);
  });

  it('should return false and achID if no ach/char faction match and no alt exists', () => {
    const result = checkFactionAch(1405, 'alliance');
    const expected = [false, 1405];
    expect(result).toStrictEqual(expected);
  });
});
