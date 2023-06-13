import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  QTCharacter,
  QTClass,
  QTRace,
  QuestTrackerSettings,
  QuestTypeSetting,
} from 'types';

const initialState: QuestTrackerSettings = {
  all: false,
  character: {},
  characterClass: {},
  race: {},
  type: '',
  zone: '',
};

export const questTrackerSlice = createSlice({
  name: 'questTracker',
  initialState,
  reducers: {
    storeQuestTrackerAll: (state, action: PayloadAction<boolean>) => {
      state.all = action.payload;

      // Clear previous primary filters
      state.characterClass = {};
      state.race = {};
      state.characterClass = {};
      state.zone = '';
    },
    storeQuestTrackerCharacter: (state, action: PayloadAction<QTCharacter>) => {
      const payload = action.payload;
      if (payload.id === 0) {
        state.character = {};
      } else {
        state.character.id = payload.id;
        state.character.name = payload.name;
        state.character.value = payload.value;
      }
    },
    storeQuestTrackerClass: (state, action: PayloadAction<QTClass>) => {
      const payload = action.payload;
      if (payload.id === 0) {
        state.characterClass = {};
      } else {
        state.characterClass.id = payload.id;
        state.characterClass.title = payload.title;
        state.characterClass.value = payload.value;
      }
      state.all = false;
    },
    storeQuestTrackerRace: (state, action: PayloadAction<QTRace>) => {
      const payload = action.payload;
      if (payload.id === 0) {
        state.race = {};
      } else {
        state.race.id = payload.id;
        state.race.title = payload.title;
        state.race.value = payload.value;
      }
      state.all = false;
    },
    storeQuestTrackerType: (
      state,
      action: PayloadAction<QuestTypeSetting | 'all quest types'>,
    ) => {
      const payload = action.payload.toLowerCase();
      if (payload === 'all quest types') {
        state.type = '';
      } else if (payload) {
        state.type = payload as QuestTypeSetting;
      }
    },
    storeQuestTrackerZone: (state, action: PayloadAction<string>) => {
      if (action.payload === 'All Zones') {
        state.zone = '';
      } else {
        state.zone = action.payload;
      }
      state.all = false;
    },
  },
});

export const {
  storeQuestTrackerAll,
  storeQuestTrackerCharacter,
  storeQuestTrackerClass,
  storeQuestTrackerRace,
  storeQuestTrackerType,
  storeQuestTrackerZone,
} = questTrackerSlice.actions;

export default questTrackerSlice.reducer;
