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
    const newFilteredQuests = filteredTemplateQuests.slice();
    newFilteredQuests[1]['completed'] = true;
    const result = createViewQuests(false, completedQuests, noCharacterSetting, templateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });


  it('should return all specific character marked, filtered template quests', () => {
    const allTypesSetting = { faction: 'horde', character: orcCharacter } as QuestTrackerSettings;
    const newFilteredQuests = filteredTemplateQuests.slice();
    newFilteredQuests[1]['completed'] = false;
    newFilteredQuests[2]['completed'] = false;
    newFilteredQuests[3]['completed'] = false;
    newFilteredQuests[4]['completed'] = false;
    const result = createViewQuests(false, completedQuests, allTypesSetting, templateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });


  it('should return all regular, specific character marked, filtered template quests', () => {
    const regularTypesSetting = { faction: 'horde', type: 'regular' } as QuestTrackerSettings;
    const newFilteredQuests = filteredTemplateQuests.slice(0, 5);
    newFilteredQuests[1]['completed'] = true;
    newFilteredQuests[2]['completed'] = true;
    newFilteredQuests[3]['completed'] = true;
    newFilteredQuests[4]['completed'] = true;
    const result = createViewQuests(false, completedQuests, regularTypesSetting, templateQuests);
    expect(result).toStrictEqual(Object.values(newFilteredQuests));
  });


  it('should return all monthly, specific character marked, filtered template quests', () => {
    const monthlyTypesSetting = {
      faction: 'horde',
      character: orcCharacter,
      type: 'monthly'
    } as QuestTrackerSettings;

    const result = createViewQuests(false, completedQuests, monthlyTypesSetting, templateQuests);
    expect(result).toStrictEqual(filteredTemplateQuests.slice(5, 6));
  });


  it('should return all shaman marked, filtered template quests', () => {
    const shamanSetting = { faction: 'horde', characterClass: shaman } as QuestTrackerSettings;
    const result = createViewQuests(false, completedQuests, shamanSetting, templateQuests);
    expect(result).toStrictEqual(filteredTemplateQuests.slice(2, 3));
  });


  it('should return all blood elf paladin marked, filtered template quests', () => {
    const raceClassMatchSetting = {
      faction: 'horde',
      characterClass: paladin,
      race: bloodElf
    } as QuestTrackerSettings;

    const result = createViewQuests(false, completedQuests, raceClassMatchSetting, templateQuests);
    expect(result).toStrictEqual(filteredTemplateQuests.slice(4, 5));
  });


  it('should return no quests for race/class mismatch', () => {
    const raceClassMismatchSetting = {
      faction: 'horde',
      characterClass: paladin,
      race: orc
    } as QuestTrackerSettings;

    const result = createViewQuests(false, completedQuests, raceClassMismatchSetting, templateQuests);
    expect(result).toStrictEqual([]);
  });


  it('should return all classless blood elf marked, filtered template quests', () => {
    const noClassSetting = { faction: 'horde', race: bloodElf } as QuestTrackerSettings;
    const result = createViewQuests(false, completedQuests, noClassSetting, templateQuests);
    expect(result).toStrictEqual(filteredTemplateQuests.slice(3, 5));
  });


  it('should return all zone marked, filtered template quests', () => {
    const zoneSetting = { faction: 'horde', zone: 'Ashenvale' } as QuestTrackerSettings;
    const newFilteredQuests = filteredTemplateQuests.slice(1, 2);
    newFilteredQuests[0]['completed'] = true;
    const result = createViewQuests(false, completedQuests, zoneSetting, templateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });
});
