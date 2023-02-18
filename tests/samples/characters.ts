import { Characters } from "../../client/types";


export const bloodElf = {
  'title': 'Blood Elf',
  'id': 10,
  'value': 512
};

export const dwarf = {
  'title': 'Dwarf',
  'id': 3,
  'value': 4
};

export const dwarfCharacter = {
  id: 1135,
  name: 'Tolrig',
  value: `{
    "characterClass": 1,
    "race": 3
  }`
};

export const orc = {
  'title': 'Orc',
  'id': 2,
  'value': 2
};

export const orcCharacter = {
  id: 4501,
  name: 'Drak',
  value: `{
    "characterClass": 3,
    "race": 2
  }`
};

export const paladin = {
  'title': 'Paladin',
  'id': 2,
  'value': 2
};

export const paladinCharacter = {
  id: 2500,
  name: 'Smith',
  value: `{
    "characterClass": 2,
    "race": 1
  }`
};

export const shaman = {
  'title': 'Shaman',
  'id': 7,
  'value': 64
};

export const shamanCharacter = {
  id: 79411,
  name: 'Gazjin',
  value: `{
    "characterClass": 7,
    "race": 8
  }`
};

export const storedCharacters = {
  alliance: {},
  horde: {
    2501: {
      guid: 2501,
      account: 1,
      name: 'Gaz',
      race: 8,
      class_field: 7,
      account_name: 'ACCOUNT1'
    },
    4501: {
      guid: 4501,
      account: 1,
      name: 'Drak',
      race: 2,
      class_field: 3,
      account_name: 'ACCOUNT1'
    }
  }
} as Characters;
