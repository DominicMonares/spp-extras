import {
  createViewQuests,
  filterTemplateQuests,
  markTemplateQuests
} from '../client/utils';
import {
  allTypesSetting,
  hordeCharacterQuests,
  hordeTemplateQuests,
  filteredHordeQuests
} from './samples';


describe.only('createViewQuests', () => {
  it('should return marked, filtered template quests', () => {
    const result = createViewQuests(hordeCharacterQuests, allTypesSetting, hordeTemplateQuests);
    expect(result).toStrictEqual(filteredHordeQuests);
  });
});

// describe('filterTemplateQuests', () => {

// });

// describe('markTemplateQuests', () => {

// });

