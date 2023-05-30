import {
  createViewQuests,
  reverseSortViewQuests,
  sortViewQuests
} from '../../src/utils';
import { QuestTrackerSettings } from '../../src/types';
import playerQuests from '../samples/renderer/playerQuests.json';
import sampleCharacterSettings from '../samples/renderer/characterSettings.json';
import sampleClasses from '../samples/renderer/classes.json';
import filteredTemplateQuests from '../samples/renderer/filteredTemplateQuests.json';
import sampleRaces from '../samples/renderer/races.json';
import templateQuests from '../samples/formattedData/templateQuests.json';

const { orcCharacter } = sampleCharacterSettings;
const { paladin, shaman } = sampleClasses;
const { bloodElf, orc } = sampleRaces;

describe('createViewQuests', () => {
  it('should return all character marked, filtered template quests', () => {
    const noCharacterSetting = { faction: 'horde' } as QuestTrackerSettings;
    const newFilteredQuests = filteredTemplateQuests.slice();
    newFilteredQuests[1]['completed'] = true;
    const result = createViewQuests(false, playerQuests, noCharacterSetting, templateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
    newFilteredQuests[1]['completed'] = false;
  });

  it('should return all specific character marked, filtered template quests', () => {
    const allTypesSetting = { faction: 'horde', character: orcCharacter } as QuestTrackerSettings;
    const newFilteredQuests = filteredTemplateQuests.slice();
    newFilteredQuests[2]['completed'] = false;
    newFilteredQuests[3]['completed'] = false;
    newFilteredQuests[4]['completed'] = false;
    const result = createViewQuests(false, playerQuests, allTypesSetting, templateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
    newFilteredQuests[2]['completed'] = true;
    newFilteredQuests[3]['completed'] = true;
    newFilteredQuests[4]['completed'] = true;
  });

  it('should return all regular, specific character marked, filtered template quests', () => {
    const regularTypesSetting = { faction: 'horde', type: 'regular' } as QuestTrackerSettings;
    const newFilteredQuests = filteredTemplateQuests.slice(0, 5);
    newFilteredQuests[1]['completed'] = true;
    const result = createViewQuests(false, playerQuests, regularTypesSetting, templateQuests);
    expect(result).toStrictEqual(Object.values(newFilteredQuests));
    newFilteredQuests[1]['completed'] = false;
  });

  it('should return all monthly, specific character marked, filtered template quests', () => {
    const monthlyTypesSetting = {
      faction: 'horde',
      character: orcCharacter,
      type: 'monthly'
    } as QuestTrackerSettings;

    const result = createViewQuests(false, playerQuests, monthlyTypesSetting, templateQuests);
    expect(result).toStrictEqual(filteredTemplateQuests.slice(5, 6));
  });

  it('should return all shaman marked, filtered template quests', () => {
    const shamanSetting = { faction: 'horde', characterClass: shaman } as QuestTrackerSettings;
    const result = createViewQuests(false, playerQuests, shamanSetting, templateQuests);
    expect(result).toStrictEqual(filteredTemplateQuests.slice(2, 3));
  });

  it('should return all blood elf paladin marked, filtered template quests', () => {
    const raceClassMatchSetting = {
      faction: 'horde',
      characterClass: paladin,
      race: bloodElf
    } as QuestTrackerSettings;

    const result = createViewQuests(false, playerQuests, raceClassMatchSetting, templateQuests);
    expect(result).toStrictEqual(filteredTemplateQuests.slice(4, 5));
  });

  it('should return no quests for race/class mismatch', () => {
    const raceClassMismatchSetting = {
      faction: 'horde',
      characterClass: paladin,
      race: orc
    } as QuestTrackerSettings;

    const result = createViewQuests(false, playerQuests, raceClassMismatchSetting, templateQuests);
    expect(result).toStrictEqual([]);
  });

  it('should return all classless blood elf marked, filtered template quests', () => {
    const noClassSetting = { faction: 'horde', race: bloodElf } as QuestTrackerSettings;
    const result = createViewQuests(false, playerQuests, noClassSetting, templateQuests);
    expect(result).toStrictEqual(filteredTemplateQuests.slice(3, 5));
  });

  it('should return all zone marked, filtered template quests', () => {
    const zoneSetting = { faction: 'horde', zone: 'Ashenvale' } as QuestTrackerSettings;
    const newFilteredQuests = filteredTemplateQuests.slice(1, 2);
    newFilteredQuests[0]['completed'] = true;
    const result = createViewQuests(false, playerQuests, zoneSetting, templateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
    newFilteredQuests[0]['completed'] = false;
  });
});

describe('sortViewQuests', () => {
  it('should sort in alphabetic order when name selected', () => {
    const quests = filteredTemplateQuests.slice(0, 4);
    const expected = [quests[0], quests[0], quests[2], quests[3], quests[1]];
    expect(sortViewQuests([quests[0], ...quests], 'name')).toStrictEqual(expected);
  });

  it('should sort in numeric order when id selected', () => {
    const quests = filteredTemplateQuests.slice(0, 4);
    const shuffled = [quests[0], quests[2], quests[3], quests[1], quests[0]];
    const expected = [quests[0], ...quests];
    expect(sortViewQuests(shuffled, 'id')).toStrictEqual(expected);
  });

  it('should sort in completed order when status selected', () => {
    const quests = filteredTemplateQuests.slice(0, 4);
    quests[0]['completed'] = false;
    const expected = [quests[2], quests[3], quests[0], quests[1]];
    expect(sortViewQuests(quests, 'status')).toStrictEqual(expected);
    expect(sortViewQuests(expected, 'status')).toStrictEqual(expected);
    expect(sortViewQuests(expected.reverse(), 'status')).toStrictEqual(expected);
    quests[0]['completed'] = true;
  });

  it('should return unsorted list when no sort setting provided', () => {
    expect(sortViewQuests(filteredTemplateQuests, '')).toStrictEqual(filteredTemplateQuests);
  });
});

describe('reverseSortViewQuests', () => {
  it('should sort in reverse alphabetic order when name selected', () => {
    const quests = filteredTemplateQuests.slice(0, 4);
    const expected = [quests[1], quests[3], quests[2], quests[0], quests[0]];
    expect(reverseSortViewQuests([...quests, quests[0]], 'name')).toStrictEqual(expected);
  });

  it('should sort in reverse numeric order when id selected', () => {
    const quests = filteredTemplateQuests.slice(0, 4);
    expect(reverseSortViewQuests(quests, 'id')).toStrictEqual(quests.reverse());
  });

  it('should sort in reverse completed order when status selected', () => {
    const quests = filteredTemplateQuests.slice(0, 4);
    quests[0]['completed'] = false;
    const expected = [quests[1], quests[0], quests[3], quests[2]];
    expect(reverseSortViewQuests(quests, 'status')).toStrictEqual(expected);
    expect(reverseSortViewQuests(expected, 'status')).toStrictEqual(expected);
    expect(reverseSortViewQuests(expected.reverse(), 'status')).toStrictEqual(expected);
    quests[0]['completed'] = true;
  });

  it('should return unsorted list when no sort setting provided', () => {
    expect(reverseSortViewQuests(filteredTemplateQuests, '')).toStrictEqual(filteredTemplateQuests);
  });
});
