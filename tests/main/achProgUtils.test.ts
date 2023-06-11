import { createProgValues } from 'utils';
import { AllAccountsData, AllTemplateQuests } from 'types';
import _allAccountData from '../samples/main/allAccountData.json';
import _templateQuests from '../samples/formattedData/templateQuests.json';
import achProgTransfer from '../samples/main/achProgTransfer.json';

const allAccountData = _allAccountData as AllAccountsData;
const templateQuests = _templateQuests as AllTemplateQuests;

jest
  .useFakeTimers()
  .setSystemTime(new Date('2023-04-24'));

describe('createProgValues', () => {
  it('should return progress arguments and char object with updated credit', () => {
    const result = createProgValues(allAccountData, templateQuests);
    const expected = achProgTransfer;
    expect(result).toStrictEqual(expected);
  });
});
