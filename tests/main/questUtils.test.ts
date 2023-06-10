import {
  formatComplFactionQuests,
  formatCompletedQuests,
  formatTemplateQuests,
} from '../../src/utils/quests';
import completedQuests from '../samples/formattedData/completedQuests.json';
import _factionSortedChars from '../samples/formattedData/factionSortedChars.json';
import factionSortedQuests from '../samples/formattedData/factionSortedQuests.json';
import rawCompletedQuests from '../samples/rawData/rawCompletedQuests.json';
import rawTemplateQuests from '../samples/rawData/rawTemplateQuests.json';
import templateQuests from '../samples/formattedData/templateQuests.json';
import { AllCharacters } from '../../src/types';

const factionSortedChars = _factionSortedChars as AllCharacters;

describe('formatCompletedQuests', () => {
  it('Should return dict with completed quests sorted by faction and character', () => {
    const { regular, daily, weekly, monthly } = rawCompletedQuests;
    const result = formatCompletedQuests( regular, daily, weekly, monthly);
    const expected = completedQuests;
    expect(result).toStrictEqual(expected);
  });
});

describe('formatComplFactionQuests', () => {
  it('Should sort quests by faction', () => {
    const result = formatComplFactionQuests(factionSortedChars, completedQuests);
    const expected = factionSortedQuests;
    expect(result).toStrictEqual(expected);
  });
});

describe('formatTemplateQuests', () => {
  it('Should return dict with template quests sorted by faction', () => {
    const result = formatTemplateQuests(rawTemplateQuests);
    const expected = templateQuests;
    expect(result).toStrictEqual(expected);
  });

  it('Should not sort Alliance specific zero quest into Horde quests', () => {
    const result = formatTemplateQuests(rawTemplateQuests);
    const resultCorrect = !result['horde']['55'];
    const expected = true;
    expect(resultCorrect).toStrictEqual(expected);
  });
});
