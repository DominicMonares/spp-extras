import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestTrackerSettings, QuestType } from '../../../types';

const initialState: QuestTrackerSettings = {
  all: false,
  character: {},
  characterClass: {},
  faction: '',
  race: {},
  type: '',
  zone: '',
};

export const questTrackerSlice = createSlice({
  name: 'questTracker',
  initialState,
  reducers: {
    storeQuestTrackerAll: (state, action: PayloadAction<QuestTrackerSettings>) => {
      state.all = action.payload.all;

      // Clear previous state items
      state.character = {};
      state.characterClass = {};
      state.race = {};
      state.characterClass = {};
      state.type = '';
      state.zone = '';
    },
    storeQuestTrackerCharacter: (state, action: PayloadAction<QuestTrackerSettings>) => {
      if (action.payload.character.id === 0) {
        state.character = {};
      } else {
        state.character.id = action.payload.character.id;
        state.character.name = action.payload.character.name;
        state.character.value = action.payload.character.value;
      }
      state.all = false;
    },
    storeQuestTrackerClass: (state, action: PayloadAction<QuestTrackerSettings>) => {
      if (action.payload.characterClass.id as number === 0) {
        state.characterClass = {};
      } else {
        state.characterClass.id = action.payload.characterClass.id;
        state.characterClass.title = action.payload.characterClass.title;
        state.characterClass.value = action.payload.characterClass.value;
      }
      state.all = false;
    },
    storeQuestTrackerRace: (state, action: PayloadAction<QuestTrackerSettings>) => {
      if (action.payload.race.id as number === 0) {
        state.race = {};
      } else {
        state.race.id = action.payload.race.id;
        state.race.title = action.payload.race.title;
        state.race.value = action.payload.race.value;
      }
      state.all = false;
    },
    storeQuestTrackerType: (state, action: PayloadAction<QuestTrackerSettings>) => {
      if (action.payload.type.toLowerCase() === 'all quest types') {
        state.type = '';
      } else {
        state.type = action.payload.type.toLowerCase() as QuestType;
      }
      state.all = false;
    },
    storeQuestTrackerZone: (state, action: PayloadAction<QuestTrackerSettings>) => {
      if (action.payload.zone === 'All Zones') {
        state.zone = '';
      } else {
        state.zone = action.payload.zone;
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
  storeQuestTrackerZone
} = questTrackerSlice.actions;

export default questTrackerSlice.reducer;
