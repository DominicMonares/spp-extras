import {
  getClass,
  getFaction,
  getRace
} from '../client/utils';
import {
  dwarf,
  dwarfCharacter,
  orc,
  orcCharacter,
  paladin,
  paladinCharacter,
  shaman,
  shamanCharacter
} from './samples';


describe('getClass', () => {
  it('Should return a paladin class setting for a paladin character', () => {
    expect(getClass(paladinCharacter)).toStrictEqual(paladin);
  });


  it('Should return a shaman class setting for a shaman character', () => {
    expect(getClass(shamanCharacter)).toStrictEqual(shaman);
  });
});


describe('getFaction', () => {
  it('Should return alliance for human race id', () => {
    expect(getFaction(1)).toBe('alliance');
  });


  it('Should return horde for blood elf race id', () => {
    expect(getFaction(10)).toBe('horde');
  });
});


describe('getRace', () => {
  it('Should return a dwarf race for an dwarf character', () => {
    expect(getRace(dwarfCharacter, 'alliance')).toStrictEqual(dwarf);
  });


  it('Should return an orc race for an orc character', () => {
    expect(getRace(orcCharacter, 'horde')).toStrictEqual(orc);
  });
});
