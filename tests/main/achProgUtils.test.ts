import { createProgValues } from "../../src/utils";
import achProgTransfer from '../samples/main/achProgTransfer.json';
import _allAccountData from '../samples/main/allAccountData.json';
import _templateQuests from '../samples/formattedData/templateQuests.json';
import {
  AllAccountsData,
  AllTemplateQuests
} from "../../src/types";

const allAccountData = _allAccountData as AllAccountsData;
const templateQuests = _templateQuests as AllTemplateQuests;

jest
  .useFakeTimers()
  .setSystemTime(new Date('2023-04-24'));

describe('createAchProgArgs', () => {
  it('Should return progress arguments and char object with updated credit', () => {
    const result = createProgValues(allAccountData, templateQuests);
    const expected = achProgTransfer;
    expect(result).toStrictEqual(expected);
  });
});
