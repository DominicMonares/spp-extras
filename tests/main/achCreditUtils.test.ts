import { createAchCreditArgs } from "../../src/utils/awAchCredit";
import achCreditTransfer from '../samples/main/achCreditTransfer.json';
import achProgTransfer from '../samples/main/achProgTransfer.json';
import achRewards from '../samples/formattedData/achRewards.json';
import itemCharges from '../samples/formattedData/itemCharges.json';

jest
  .useFakeTimers()
  .setSystemTime(new Date('2023-04-24'));

describe('createAchCreditArgs', () => {
  it('Should return all credit and reward arguments', () => {
    const accounts = achProgTransfer['newAccounts']
    const result = createAchCreditArgs(accounts, achRewards, itemCharges, 1000, 1000);
    const expected = achCreditTransfer;
    expect(result).toStrictEqual(expected);
  });
});
