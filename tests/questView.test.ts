import {
  createViewQuests
} from '../client/utils';
import {
  allTypesSetting,
  hordeCharacterQuests,
  hordeTemplateQuests,
  filteredHordeQuests,
  monthlyTypesSetting,
  noCharacterSetting,
  shamanSetting,
  regularTypesSetting,
  raceClassMatchSetting,
  raceClassMismatchSetting,
  noClassSetting
} from './samples';


describe('createViewQuests', () => {
  it('should return all character marked, filtered template quests', () => {
    const newFilteredQuests = { 
      ...filteredHordeQuests,
      25: {
        ...filteredHordeQuests['25'],
        completed: true
      }
    };

    const result = createViewQuests(hordeCharacterQuests, noCharacterSetting, hordeTemplateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });
  

  it('should return all specific character marked, filtered template quests', () => {
    const newFilteredQuests = {
      ...filteredHordeQuests,
      1523: {
        ...filteredHordeQuests['1523'],
        completed: false
      },
      9621: {
        ...filteredHordeQuests['9621'],
        completed: false
      },
      9678: {
        ...filteredHordeQuests['9678'],
        completed: false
      }
    };

    const result = createViewQuests(hordeCharacterQuests, allTypesSetting, hordeTemplateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });
  

  it('should return all regular, specific character marked, filtered template quests', () => {
    const newFilteredQuests = {
      8: { ...filteredHordeQuests['8'] },
      25: { ...filteredHordeQuests['25'], completed: true },
      1523: { ...filteredHordeQuests['1523'] },
      9621: { ...filteredHordeQuests['9621'] },
      9678: { ...filteredHordeQuests['9678'] }
    };
    
    const result = createViewQuests(hordeCharacterQuests, regularTypesSetting, hordeTemplateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });


  it('should return all monthly, specific character marked, filtered template quests', () => {
    const newFilteredQuests = { 
      9884: { ...filteredHordeQuests['9884'] } 
    };

    const result = createViewQuests(hordeCharacterQuests, monthlyTypesSetting, hordeTemplateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });


  it('should return all shaman marked, filtered template quests', () => {
    const newFilteredQuests = { 1523: { ...filteredHordeQuests['1523'] } };
    const result = createViewQuests(hordeCharacterQuests, shamanSetting, hordeTemplateQuests);

    expect(result).toStrictEqual(newFilteredQuests);
  });


  it('should return all blood elf paladin marked, filtered template quests', () => {
    const newFilteredQuests = { 9678: { ...filteredHordeQuests['9678'] } };
    const result = createViewQuests(hordeCharacterQuests, raceClassMatchSetting, hordeTemplateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });


  it('should return no quests for race/class mismatch', () => {
    const result = createViewQuests(hordeCharacterQuests, raceClassMismatchSetting, hordeTemplateQuests);
    expect(result).toStrictEqual({});
  });


  it.only('should return all classless blood elf marked, filtered template quests', () => {
    const newFilteredQuests = { 9621: { ...filteredHordeQuests['9621'] } };
    const result = createViewQuests(hordeCharacterQuests, noClassSetting, hordeTemplateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });
});
