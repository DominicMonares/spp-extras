import {
  formatPetMountItemData,
  formatCharSpellData,
  formatCharSkillData,
  createPetMountSpellValues
} from 'utils';
import { AccountCharacters } from 'types';
import allAccountsChars from '../samples/formattedData/allAccountsChars.json';
import characterSkills from '../samples/formattedData/characterSkills.json';
import characterSpells from '../samples/formattedData/characterSpells.json';
import petMountItems from '../samples/formattedData/petMountItems.json';
import rawCharacterSkills from '../samples/rawData/rawCharacterSkills.json';
import rawCharacterSpells from '../samples/rawData/rawCharacterSpells.json';
import rawPetMountItems from '../samples/rawData/rawPetMountItems.json';
import transferredPetsMounts from '../samples/main/transferredPetsMounts.json';

describe('formatPetMountItemData', () => {
  it('should return pet and mount item object sorted by spell ID', () => {
    const result = formatPetMountItemData(rawPetMountItems);
    const expected = petMountItems;
    expect(result).toStrictEqual(expected);
  });
});

describe('formatCharSpellData', () => {
  it('should return known pet and mount spell object sorted by character', () => {
    const result = formatCharSpellData(rawCharacterSpells);
    const expected = characterSpells;
    expect(result).toStrictEqual(expected);
  });
});

describe('formatCharSkillData', () => {
  it('should return riding skill object sorted by character', () => {
    const result = formatCharSkillData(rawCharacterSkills);
    const expected = characterSkills;
    expect(result).toStrictEqual(expected);
  });
});

describe('createPetMountSpellValues', () => {
  it('should return array of pet and mount spell query arguments', () => {
    const result = createPetMountSpellValues(
      allAccountsChars as AccountCharacters,
      petMountItems,
      characterSpells,
      characterSkills,
    );
    const expected = transferredPetsMounts;
    expect(result).toStrictEqual(transferredPetsMounts);
  });
});
