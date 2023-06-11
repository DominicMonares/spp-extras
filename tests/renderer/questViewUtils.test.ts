import { createViewQuests, reverseSortViewQuests, sortViewQuests } from 'utils';
import { QuestTrackerSettings } from 'types';
import filteredTemplateQuests from '../samples/renderer/filteredTemplateQuests.json';
import playerQuests from '../samples/renderer/playerQuests.json';
import sampleCharacterSettings from '../samples/renderer/characterSettings.json';
import sampleClasses from '../samples/renderer/classes.json';
import sampleRaces from '../samples/renderer/races.json';
import templateQuests from '../samples/formattedData/templateQuests.json';

const { orcCharacter } = sampleCharacterSettings;
const { paladin, shaman } = sampleClasses;
const { bloodElf, orc } = sampleRaces;

describe('createViewQuests', () => {
  it('should return all character marked, filtered template quests', () => {
    const settings = {
      all: true,
      character: {},
      characterClass: {},
      race: {},
      type: '',
      zone: '',
    } as QuestTrackerSettings;
    const newFilteredQuests = filteredTemplateQuests.allHorde;
    const result = createViewQuests(settings, 'horde', playerQuests, templateQuests);
    const expected = newFilteredQuests;
    expect(result).toStrictEqual(expected);
  });

  it('should return all specific character marked, filtered template quests', () => {
    const settings = {
      all: false,
      character: orcCharacter,
      characterClass: {},
      race: {},
      type: '',
      zone: '',
    } as QuestTrackerSettings;
    const newFilteredQuests = filteredTemplateQuests.orcChar;
    const result = createViewQuests(settings, 'horde', playerQuests, templateQuests);
    const expected = newFilteredQuests;
    expect(result).toStrictEqual(expected);
  });

  it('should return all regular, specific character marked, filtered template quests', () => {
    const settings = {
      all: false,
      character: orcCharacter,
      characterClass: {},
      race: {},
      type: 'regular',
      zone: '',
    } as QuestTrackerSettings;
    const newFilteredQuests = filteredTemplateQuests.regOrcQuests;
    const result = createViewQuests(settings, 'horde', playerQuests, templateQuests);
    const expected = Object.values(newFilteredQuests);
    expect(result).toStrictEqual(expected);
  });

  it('should return all monthly, specific character marked, filtered template quests', () => {
    const settings = {
      all: false,
      character: orcCharacter,
      characterClass: {},
      race: {},
      type: 'monthly',
      zone: '',
    } as QuestTrackerSettings;
    const newFilteredQuests = filteredTemplateQuests.monthlyOrcQuests;
    const result = createViewQuests(settings, 'horde', playerQuests, templateQuests);
    const expected = newFilteredQuests;
    expect(result).toStrictEqual(expected);
  });

  it('should return all shaman marked, filtered template quests', () => {
    const settings = {
      all: false,
      character: {},
      characterClass: shaman,
      race: {},
      type: '',
      zone: '',
    } as QuestTrackerSettings;
    const newFilteredQuests = filteredTemplateQuests.shamanQuests;
    const result = createViewQuests(settings, 'horde', playerQuests, templateQuests);
    const expected = newFilteredQuests;
    expect(result).toStrictEqual(expected);
  });

  it('should return all blood elf paladin marked, filtered template quests', () => {
    const settings = {
      all: false,
      character: {},
      characterClass: paladin,
      race: bloodElf,
      type: '',
      zone: '',
    } as QuestTrackerSettings;
    const result = createViewQuests(settings, 'horde', playerQuests, templateQuests);
    const expected = filteredTemplateQuests.bloodKnightQuests;
    expect(result).toStrictEqual(expected);
  });

  it('should return no quests for race/class mismatch', () => {
    const settings = {
      all: false,
      character: {},
      characterClass: paladin,
      race: orc,
      type: '',
      zone: '',
    } as QuestTrackerSettings;
    const result = createViewQuests(settings, 'horde', playerQuests, templateQuests);
    const expected: [] = [];
    expect(result).toStrictEqual(expected);
  });

  it('should return all classless blood elf marked, filtered template quests', () => {
    const settings = {
      all: false,
      character: {},
      characterClass: {},
      race: bloodElf,
      type: '',
      zone: '',
    } as QuestTrackerSettings;
    const result = createViewQuests(settings, 'horde', playerQuests, templateQuests);
    const expected = filteredTemplateQuests.bloodElfQuests;
    expect(result).toStrictEqual(expected);
  });

  it('should return all zone marked, filtered template quests', () => {
    const settings = {
      all: false,
      character: {},
      characterClass: {},
      race: {},
      type: '',
      zone: 'Ashenvale',
    } as QuestTrackerSettings;
    const newFilteredQuests = filteredTemplateQuests.ashenvaleQuests;
    const result = createViewQuests(settings, 'horde', playerQuests, templateQuests);
    const expected = newFilteredQuests;
    expect(result).toStrictEqual(expected);
  });
});

describe('sortViewQuests', () => {
  it('should sort in alphabetic order when name selected', () => {
    const quests = filteredTemplateQuests.sortQuests;
    const result = sortViewQuests([quests[0], ...quests], 'name');
    const expected = [quests[0], quests[0], quests[2], quests[3], quests[1]];
    expect(result).toStrictEqual(expected);
  });

  it('should sort in numeric order when id selected', () => {
    const quests = filteredTemplateQuests.sortQuests;
    const shuffled = [quests[0], quests[2], quests[3], quests[1], quests[0]];
    const result = sortViewQuests(shuffled, 'id');
    const expected = [quests[0], ...quests];
    expect(result).toStrictEqual(expected);
  });

  it('should sort in completed order when status selected', () => {
    const quests = filteredTemplateQuests.sortQuestsCompl;
    const expected = [quests[2], quests[3], quests[0], quests[1]];
    const result1 = sortViewQuests(quests, 'status');
    expect(result1).toStrictEqual(expected);
    const result2 = sortViewQuests(expected, 'status');
    expect(result2).toStrictEqual(expected);
    const result3 = sortViewQuests(expected.reverse(), 'status');
    expect(result3).toStrictEqual(expected);
  });

  it('should return unsorted list when no sort setting provided', () => {
    const result = sortViewQuests(filteredTemplateQuests.allHorde, '');
    const expected = filteredTemplateQuests.allHorde;
    expect(result).toStrictEqual(expected);
  });
});

describe('reverseSortViewQuests', () => {
  it('should sort in reverse alphabetic order when name selected', () => {
    const quests = filteredTemplateQuests.sortQuests;
    const result = reverseSortViewQuests([...quests, quests[0]], 'name');
    const expected = [quests[1], quests[3], quests[2], quests[0], quests[0]];
    expect(result).toStrictEqual(expected);
  });

  it('should sort in reverse numeric order when id selected', () => {
    const quests = filteredTemplateQuests.sortQuests;
    const result = reverseSortViewQuests(quests, 'id');
    const expected = quests.reverse();
    expect(result).toStrictEqual(expected);
  });

  it('should sort in reverse completed order when status selected', () => {
    const quests = filteredTemplateQuests.sortQuests;
    quests[0]['completed'] = false;
    const expected = [quests[1], quests[0], quests[3], quests[2]];
    const result1 = reverseSortViewQuests(quests, 'status');
    expect(result1).toStrictEqual(expected);
    const result2 = reverseSortViewQuests(expected, 'status');
    expect(result2).toStrictEqual(expected);
    const result3 = reverseSortViewQuests(expected.reverse(), 'status');
    expect(result3).toStrictEqual(expected);
    quests[0]['completed'] = true;
  });

  it('should return unsorted list when no sort setting provided', () => {
    const result = reverseSortViewQuests(filteredTemplateQuests.allHorde, '');
    const expected = filteredTemplateQuests.allHorde;
    expect(result).toStrictEqual(expected);
  });
});
