import {
  orcCharacter
} from './characters';
import { QuestTrackerSettings } from '../../client/types';


export const allTypesSetting = {
  faction: 'horde',
  character: orcCharacter
} as QuestTrackerSettings;

export const monthlyTypesSetting = { 
  ...allTypesSetting, 
  type: 'monthly' 
} as QuestTrackerSettings;

export const regularTypesSetting = {
  faction: 'horde',
  type: 'regular' 
} as QuestTrackerSettings;

export const noCharacterSetting = {
  faction: 'horde'
} as QuestTrackerSettings;
