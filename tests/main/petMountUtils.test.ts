import {
  formatPetMountItemData,
  formatCharSpellData,
  formatCharSkillData,
  createPetMountSpellArgs
} from '../../src/utils/petsMounts';
import allAccountsChars from '../samples/formattedData/allAccountsChars.json';
import characterSkills from '../samples/formattedData/characterSkills.json';
import characterSpells from '../samples/formattedData/characterSpells.json';
import petMountItems from '../samples/formattedData/petMountItems.json';
import rawCharacterSkills from '../samples/rawData/rawCharacterSkills.json';
import rawCharacterSpells from '../samples/rawData/rawCharacterSpells.json';
import rawPetMountItems from '../samples/rawData/rawPetMountItems.json';
import transferredPetsMounts from '../samples/main/transferredPetsMounts.json';

describe('formatPetMountItemData', () => {
  it('Should return pet and mount item object sorted by spell ID', () => {
    const result = formatPetMountItemData(rawPetMountItems);
    const expected = petMountItems;
    expect(result).toStrictEqual(expected);
  });
});

describe('formatCharSpellData', () => {
  it('Should return known pet and mount spell object sorted by character', () => {
    const result = formatCharSpellData(rawCharacterSpells);
    const expected = characterSpells;
    expect(result).toStrictEqual(expected);
  });
});

describe('formatCharSkillData', () => {
  it('Should return riding skill object sorted by character', () => {
    const result = formatCharSkillData(rawCharacterSkills);
    const expected = characterSkills;
    expect(result).toStrictEqual(expected);
  });
});

describe('createPetMountSpellArgs', () => {
  it('Should return array of pet and mount spell query arguments', () => {
    const result = createPetMountSpellArgs(
      petMountItems,
      allAccountsChars,
      characterSpells,
      characterSkills,
    );
    const expected = transferredPetsMounts;
    expect(result).toStrictEqual(expected);
  });
});
