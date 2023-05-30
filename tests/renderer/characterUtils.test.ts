import { checkClass, checkFaction, checkRace } from '../../src/utils';
import sampleCharSettings from '../samples/renderer/characterSettings.json';
import sampleClasses from '../samples/renderer/classes.json';
import sampleRaces from '../samples/renderer/races.json';

describe('checkClass', () => {
  it('Should return a paladin class setting for a paladin character', () => {
    const result = checkClass(sampleCharSettings.paladinCharacter);
    const expected = sampleClasses.paladin;
    expect(result).toStrictEqual(expected);
  });

  it('Should return a shaman class setting for a shaman character', () => {
    const result = checkClass(sampleCharSettings.shamanCharacter);
    const expected = sampleClasses.shaman;
    expect(result).toStrictEqual(expected);
  });
});

describe('checkFaction', () => {
  it('Should return alliance for human race id', () => {
    expect(checkFaction(1)).toBe('alliance');
  });

  it('Should return horde for blood elf race id', () => {
    expect(checkFaction(10)).toBe('horde');
  });
});

describe('checkRace', () => {
  it('Should return a dwarf race for an dwarf character', () => {
    const result = checkRace(sampleCharSettings.dwarfCharacter, 'alliance');
    const expected = sampleRaces.dwarf;
    expect(result).toStrictEqual(expected);
  });

  it('Should return an orc race for an orc character', () => {
    const result = checkRace(sampleCharSettings.orcCharacter, 'horde');
    const expected = sampleRaces.orc;
    expect(result).toStrictEqual(expected);
  });
});
