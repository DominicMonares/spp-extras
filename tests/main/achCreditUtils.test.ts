import { createCreditRewValues } from 'utils';
import { AchRewards, AllAccountsData } from 'types';
import _achRewards from '../samples/formattedData/achRewards.json';
import achCreditTransfer from '../samples/main/achCreditTransfer.json';
import achProgTransfer from '../samples/main/achProgTransfer.json';
import itemCharges from '../samples/formattedData/itemCharges.json';

const achRewards = _achRewards as AchRewards

jest
  .useFakeTimers()
  .setSystemTime(new Date('2023-04-24'));

describe('createCreditRewValues', () => {
  it('should return all credit and reward arguments', () => {
    const accounts = achProgTransfer['newAcctData'] as AllAccountsData;
    const result = createCreditRewValues(accounts, achRewards, itemCharges, 1000, 1000);
    const expected = achCreditTransfer;
    expect(result).toStrictEqual(expected);
  });
});
