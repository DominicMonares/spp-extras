import { createCreditRewValues } from "../../src/utils";
import achCreditTransfer from '../samples/main/achCreditTransfer.json';
import achProgTransfer from '../samples/main/achProgTransfer.json';
import _achRewards from '../samples/formattedData/achRewards.json';
import itemCharges from '../samples/formattedData/itemCharges.json';
import { AchRewards, AllAccountsData } from "../../src/types";

const achRewards = _achRewards as AchRewards

jest
  .useFakeTimers()
  .setSystemTime(new Date('2023-04-24'));

describe('createCreditRewValues', () => {
  it('Should return all credit and reward arguments', () => {
    const accounts = achProgTransfer['newAcctData'] as AllAccountsData;
    const result = createCreditRewValues(accounts, achRewards, itemCharges, 1000, 1000);
    const expected = achCreditTransfer;
    expect(result).toStrictEqual(expected);
  });
});
