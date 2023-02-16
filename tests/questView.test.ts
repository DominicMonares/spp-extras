import {
  createViewQuests,
  filterTemplateQuests,
  markTemplateQuests
} from '../client/utils';
import {
  allTypesSetting,
  hordeCharacterQuests,
  hordeTemplateQuests,
  filteredHordeQuests,
  noCharacterSetting
} from './samples';


describe.only('createViewQuests', () => {
  it('should return character marked, filtered template quests', () => {
    const result = createViewQuests(hordeCharacterQuests, allTypesSetting, hordeTemplateQuests);
    expect(result).toStrictEqual(filteredHordeQuests);
  });

  it('should return all character marked, filtered template quests', () => {
    const newFilteredQuests = filteredHordeQuests;
    newFilteredQuests['25']['completed'] = true;
    const result = createViewQuests(hordeCharacterQuests, noCharacterSetting, hordeTemplateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });
});

// describe('filterTemplateQuests', () => {

// });

// describe('markTemplateQuests', () => {

// });

