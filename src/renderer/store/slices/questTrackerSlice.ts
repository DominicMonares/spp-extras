import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CharacterSetting,
  ClassSetting,
  QuestTrackerSettings,
  QuestType,
  RaceSetting
} from '../../types';


const initialState: QuestTrackerSettings = {
  all: false,
  zone: 'Nagrand' // TEMP DEFAULT
};

export const questTrackerSlice = createSlice({
  name: 'questTracker',
  initialState,
  reducers: {
    storeQuestTrackerAll: (state, action: PayloadAction<QuestTrackerSettings>) => {
      state.all = action.payload.all;
      if (state.character) delete state.character;
      if (state.characterClass) delete state.characterClass;
      if (state.race) delete state.race;
      if (state.characterClass) delete state.characterClass;
      if (state.type) delete state.type;
      if (state.zone) delete state.zone;
    },
    storeQuestTrackerCharacter: (state, action: PayloadAction<QuestTrackerSettings>) => {
      if (!state.character) state.character = {} as CharacterSetting;
      if (action.payload.character?.id === 0) { // TEMP CHECK FOR UNDEFINED TYPE
        delete state.character;
      } else {
        state.character.id = action.payload.character?.id as any; // TEMP CHECK FOR UNDEFINED TYPE
        state.character.name = action.payload.character?.name as any; // TEMP CHECK FOR UNDEFINED TYPE
        state.character.value = action.payload.character?.value as any; // TEMP CHECK FOR UNDEFINED TYPE
      }

      if (state.all) delete state.all;
    },
    storeQuestTrackerClass: (state, action: PayloadAction<QuestTrackerSettings>) => {
      if (!state.characterClass) state.characterClass = {} as ClassSetting;
      if (action.payload.characterClass?.id as number === 0) { // TEMP CHECK FOR UNDEFINED TYPE
        delete state.characterClass;
      } else {
        state.characterClass.id = action.payload.characterClass?.id as any; // TEMP CHECK FOR UNDEFINED TYPE
        state.characterClass.title = action.payload.characterClass?.title as any; // TEMP CHECK FOR UNDEFINED TYPE
        state.characterClass.value = action.payload.characterClass?.value as any; // TEMP CHECK FOR UNDEFINED TYPE
      }

      if (state.all) delete state.all;
    },
    storeQuestTrackerRace: (state, action: PayloadAction<QuestTrackerSettings>) => {
      if (!state.race) state.race = {} as RaceSetting;
      if (action.payload.race?.id as number === 0) { // TEMP CHECK FOR UNDEFINED TYPE
        delete state.race;
      } else {
        state.race.id = action.payload.race?.id as any; // TEMP CHECK FOR UNDEFINED TYPE
        state.race.title = action.payload.race?.title as any; // TEMP CHECK FOR UNDEFINED TYPE
        state.race.value = action.payload.race?.value as any; // TEMP CHECK FOR UNDEFINED TYPE
      }

      if (state.all) delete state.all;
    },
    storeQuestTrackerType: (state, action: PayloadAction<QuestTrackerSettings>) => {
      if (action.payload.type?.toLowerCase() === 'all quest types') { // TEMP CHECK FOR UNDEFINED TYPE
        delete state.type;
      } else {
        state.type = action.payload.type?.toLowerCase() as QuestType; // TEMP CHECK FOR UNDEFINED TYPE
      }

      if (state.all) delete state.all;
    },
    storeQuestTrackerZone: (state, action: PayloadAction<QuestTrackerSettings>) => {
      if (action.payload.zone === 'All Zones') {
        delete state.zone;
      } else {
        state.zone = action.payload.zone;
      }

      if (state.all) delete state.all;
    }
  }
});

export const {
  storeQuestTrackerAll,
  storeQuestTrackerCharacter,
  storeQuestTrackerClass,
  storeQuestTrackerRace,
  storeQuestTrackerType,
  storeQuestTrackerZone
} = questTrackerSlice.actions;

export default questTrackerSlice.reducer;
