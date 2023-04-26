import { checkClass, checkFaction, checkRace } from '../../client/utils';
import sampleCharacterSettings from '../samples/client/characterSettings.json';
import sampleClasses from '../samples/client/classes.json';
import sampleRaces from '../samples/client/races.json';


const { 
  dwarfCharacter, 
  orcCharacter,
  paladinCharacter,
  shamanCharacter
} = sampleCharacterSettings;
const { paladin, shaman } = sampleClasses;
const { dwarf, orc } = sampleRaces;

describe('checkClass', () => {
  it('Should return a paladin class setting for a paladin character', () => {
    expect(checkClass(paladinCharacter)).toStrictEqual(paladin);
  });


  it('Should return a shaman class setting for a shaman character', () => {
    expect(checkClass(shamanCharacter)).toStrictEqual(shaman);
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
    expect(checkRace(dwarfCharacter, 'alliance')).toStrictEqual(dwarf);
  });


  it('Should return an orc race for an orc character', () => {
    expect(checkRace(orcCharacter, 'horde')).toStrictEqual(orc);
  });
});
