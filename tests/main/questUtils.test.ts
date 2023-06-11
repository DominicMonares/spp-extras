import {
  formatComplFactionQuests,
  formatCompletedQuests,
  formatTemplateQuests,
} from 'utils';
import { AllCharacters } from 'types';
import _factionSortedChars from '../samples/formattedData/factionSortedChars.json';
import completedQuests from '../samples/formattedData/completedQuests.json';
import factionSortedQuests from '../samples/formattedData/factionSortedQuests.json';
import rawCompletedQuests from '../samples/rawData/rawCompletedQuests.json';
import rawTemplateQuests from '../samples/rawData/rawTemplateQuests.json';
import templateQuests from '../samples/formattedData/templateQuests.json';

const factionSortedChars = _factionSortedChars as AllCharacters;

describe('formatCompletedQuests', () => {
  it('should sort completed quests by faction and character', () => {
    const { regular, daily, weekly, monthly } = rawCompletedQuests;
    const result = formatCompletedQuests( regular, daily, weekly, monthly);
    const expected = completedQuests;
    expect(result).toStrictEqual(expected);
  });
});

describe('formatComplFactionQuests', () => {
  it('should sort quests by faction', () => {
    const result = formatComplFactionQuests(factionSortedChars, completedQuests);
    const expected = factionSortedQuests;
    expect(result).toStrictEqual(expected);
  });
});

describe('formatTemplateQuests', () => {
  it('should return obj with template quests sorted by faction', () => {
    const result = formatTemplateQuests(rawTemplateQuests);
    const expected = templateQuests;
    expect(result).toStrictEqual(expected);
  });

  it('should not sort Alliance specific zero quest into Horde quests', () => {
    const result = formatTemplateQuests(rawTemplateQuests);
    const resultCorrect = !result['horde']['55'];
    const expected = true;
    expect(resultCorrect).toStrictEqual(expected);
  });
});
