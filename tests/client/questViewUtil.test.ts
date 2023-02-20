import { createViewQuests } from '../../client/utils';
import { QuestTrackerSettings } from '../../client/types';
import completedQuests from '../samples/completedQuests.json';
import sampleCharacterSettings from '../samples/characterSettings.json';
import sampleClasses from '../samples/classes.json';
import filteredTemplateQuests from '../samples/filteredTemplateQuests.json';
import sampleRaces from '../samples/races.json';
import templateQuests from '../samples/templateQuests.json';


const { orcCharacter } = sampleCharacterSettings;
const { paladin, shaman } = sampleClasses;
const { bloodElf, orc } = sampleRaces;

describe('createViewQuests', () => {
  it('should return all character marked, filtered template quests', () => {
    const noCharacterSetting = { faction: 'horde' } as QuestTrackerSettings;
    const newFilteredQuests = {
      ...filteredTemplateQuests,
      25: {
        ...filteredTemplateQuests['25'],
        completed: true
      }
    };

    const result = createViewQuests(completedQuests, noCharacterSetting, templateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });


  it('should return all specific character marked, filtered template quests', () => {
    const allTypesSetting = { faction: 'horde', character: orcCharacter } as QuestTrackerSettings;
    const newFilteredQuests = {
      ...filteredTemplateQuests,
      1523: {
        ...filteredTemplateQuests['1523'],
        completed: false
      },
      9621: {
        ...filteredTemplateQuests['9621'],
        completed: false
      },
      9678: {
        ...filteredTemplateQuests['9678'],
        completed: false
      }
    };

    const result = createViewQuests(completedQuests, allTypesSetting, templateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });


  it('should return all regular, specific character marked, filtered template quests', () => {
    const regularTypesSetting = { faction: 'horde', type: 'regular' } as QuestTrackerSettings;
    const newFilteredQuests = {
      8: { ...filteredTemplateQuests['8'] },
      25: { ...filteredTemplateQuests['25'], completed: true },
      1523: { ...filteredTemplateQuests['1523'] },
      9621: { ...filteredTemplateQuests['9621'] },
      9678: { ...filteredTemplateQuests['9678'] }
    };

    const result = createViewQuests(completedQuests, regularTypesSetting, templateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });


  it('should return all monthly, specific character marked, filtered template quests', () => {
    const monthlyTypesSetting = {
      faction: 'horde',
      character: orcCharacter,
      type: 'monthly'
    } as QuestTrackerSettings;

    const newFilteredQuests = {
      9884: { ...filteredTemplateQuests['9884'] }
    };

    const result = createViewQuests(completedQuests, monthlyTypesSetting, templateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });


  it('should return all shaman marked, filtered template quests', () => {
    const shamanSetting = { faction: 'horde', characterClass: shaman } as QuestTrackerSettings;
    const newFilteredQuests = { 1523: { ...filteredTemplateQuests['1523'] } };
    const result = createViewQuests(completedQuests, shamanSetting, templateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });


  it('should return all blood elf paladin marked, filtered template quests', () => {
    const raceClassMatchSetting = {
      faction: 'horde',
      characterClass: paladin,
      race: bloodElf
    } as QuestTrackerSettings;

    const newFilteredQuests = { 9678: { ...filteredTemplateQuests['9678'] } };
    const result = createViewQuests(completedQuests, raceClassMatchSetting, templateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });


  it('should return no quests for race/class mismatch', () => {
    const raceClassMismatchSetting = {
      faction: 'horde',
      characterClass: paladin,
      race: orc
    } as QuestTrackerSettings;

    const result = createViewQuests(completedQuests, raceClassMismatchSetting, templateQuests);
    expect(result).toStrictEqual({});
  });


  it('should return all classless blood elf marked, filtered template quests', () => {
    const noClassSetting = { faction: 'horde', race: bloodElf } as QuestTrackerSettings;
    const newFilteredQuests = { 9621: { ...filteredTemplateQuests['9621'] } };
    const result = createViewQuests(completedQuests, noClassSetting, templateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });


  it('should return all zone marked, filtered template quests', () => {
    const zoneSetting = { faction: 'horde', zone: 'Ashenvale' } as QuestTrackerSettings;
    const newFilteredQuests = { 25: { ...filteredTemplateQuests['25'], completed: true } };
    const result = createViewQuests(completedQuests, zoneSetting, templateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });
});
