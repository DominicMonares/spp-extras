import { createAchProgArgs } from "../../src/main/utils/achProg";
import achProgTransfer from '../samples/main/achProgTransfer.json';
import allAccountData from '../samples/main/allAccountData.json';
import templateQuests from '../samples/formattedData/templateQuests.json';

jest
  .useFakeTimers()
  .setSystemTime(new Date('2023-04-24'));

  describe('createAchProgArgs', () => {
    it('Should return progress arguments and char object with updated credit', () => {
      const result = createAchProgArgs(allAccountData, templateQuests);
      const expected = achProgTransfer;
      expect(result).toStrictEqual(expected);
    });
  });
