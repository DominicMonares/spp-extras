import {
  bloodElf,
  orc,
  orcCharacter, 
  paladin, 
  shaman
} from './characters';
import { QuestTrackerSettings } from '../../client/types';


export const allTypesSetting = {
  faction: 'horde',
  character: orcCharacter
} as QuestTrackerSettings;

export const monthlyTypesSetting = { 
  faction: 'horde',
  character: orcCharacter, 
  type: 'monthly' 
} as QuestTrackerSettings;

export const noCharacterSetting = {
  faction: 'horde'
} as QuestTrackerSettings;

export const noClassSetting = {
  faction: 'horde',
  race: bloodElf
} as QuestTrackerSettings;

export const raceClassMatchSetting = {
  faction: 'horde',
  characterClass: paladin,
  race: bloodElf
} as QuestTrackerSettings;

export const raceClassMismatchSetting = {
  faction: 'horde',
  characterClass: paladin,
  race: orc
} as QuestTrackerSettings;

export const regularTypesSetting = {
  faction: 'horde',
  type: 'regular' 
} as QuestTrackerSettings;

export const shamanSetting = {
  faction: 'horde',
  characterClass: shaman
} as QuestTrackerSettings;
