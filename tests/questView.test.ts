import {
  createViewQuests
} from '../client/utils';
import {
  allTypesSetting,
  hordeCharacterQuests,
  templateQuests,
  filteredHordeQuests,
  monthlyTypesSetting,
  noCharacterSetting,
  shamanSetting,
  regularTypesSetting,
  raceClassMatchSetting,
  raceClassMismatchSetting,
  noClassSetting,
  zoneSetting
} from './samples';


describe.only('createViewQuests', () => {
  it('should return all character marked, filtered template quests', () => {
    const newFilteredQuests = { 
      ...filteredHordeQuests,
      25: {
        ...filteredHordeQuests['25'],
        completed: true
      }
    };

    const result = createViewQuests(hordeCharacterQuests, noCharacterSetting, templateQuests);
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

    const result = createViewQuests(hordeCharacterQuests, allTypesSetting, templateQuests);
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
    
    const result = createViewQuests(hordeCharacterQuests, regularTypesSetting, templateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });


  it('should return all monthly, specific character marked, filtered template quests', () => {
    const newFilteredQuests = { 
      9884: { ...filteredHordeQuests['9884'] } 
    };

    const result = createViewQuests(hordeCharacterQuests, monthlyTypesSetting, templateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });


  it('should return all shaman marked, filtered template quests', () => {
    const newFilteredQuests = { 1523: { ...filteredHordeQuests['1523'] } };
    const result = createViewQuests(hordeCharacterQuests, shamanSetting, templateQuests);

    expect(result).toStrictEqual(newFilteredQuests);
  });


  it('should return all blood elf paladin marked, filtered template quests', () => {
    const newFilteredQuests = { 9678: { ...filteredHordeQuests['9678'] } };
    const result = createViewQuests(hordeCharacterQuests, raceClassMatchSetting, templateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });


  it('should return no quests for race/class mismatch', () => {
    const result = createViewQuests(hordeCharacterQuests, raceClassMismatchSetting, templateQuests);
    expect(result).toStrictEqual({});
  });


  it('should return all classless blood elf marked, filtered template quests', () => {
    const newFilteredQuests = { 9621: { ...filteredHordeQuests['9621'] } };
    const result = createViewQuests(hordeCharacterQuests, noClassSetting, templateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });


  it('should return all zone marked, filtered template quests', () => {
    const newFilteredQuests = { 25: { ...filteredHordeQuests['25'], completed: true } };
    const result = createViewQuests(hordeCharacterQuests, zoneSetting, templateQuests);
    expect(result).toStrictEqual(newFilteredQuests);
  });
});
