import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestTrackerSettings } from '../../types';


const initialState: QuestTrackerSettings = {
  faction: 'alliance',
  type: 'reg'
};

export const questTrackerSlice = createSlice({
  name: 'questTracker',
  initialState,
  reducers: {
    storeQuestTrackerFaction: (state, action: PayloadAction<QuestTrackerSettings>) => {
      state.faction = action.payload.faction;
      if (state.race) delete state.race;
      if (state.character) delete state.character;
    },
    storeQuestTrackerType: (state, action: PayloadAction<QuestTrackerSettings>) => {
      state.type = action.payload.type;
    },
    storeQuestTrackerZone: (state, action: PayloadAction<QuestTrackerSettings>) => {
      state.zone = action.payload.zone;
    },
    storeQuestTrackerClass: (state, action: PayloadAction<QuestTrackerSettings>) => {
      if (!state.characterClass) state.characterClass = {};
      state.characterClass.id = action.payload.characterClass.id;
      state.characterClass.title = action.payload.characterClass.title;
      state.characterClass.value = action.payload.characterClass.value;
      if (state.zone) delete state.zone;
      if (state.race) delete state.race;
      if (state.character) delete state.character;
    },
    storeQuestTrackerRace: (state, action: PayloadAction<QuestTrackerSettings>) => {
      if (!state.race) state.race = {};
      state.race.id = action.payload.race.id;
      state.race.title = action.payload.race.title;
      state.race.value = action.payload.race.value;
      if (state.zone) delete state.zone;
      if (state.characterClass) delete state.characterClass;
      if (state.character) delete state.character;
    },
    storeQuestTrackerCharacter: (state, action: PayloadAction<QuestTrackerSettings>) => {
      if (!state.character) state.character = {};
      state.character.id = action.payload.character.id;
      state.character.name = action.payload.character.name;
      if (state.race) delete state.race;
      if (state.characterClass) delete state.characterClass;
    }
  }
});

export const {
  storeQuestTrackerFaction,
  storeQuestTrackerZone,
  storeQuestTrackerRace,
  storeQuestTrackerClass,
  storeQuestTrackerCharacter,
  storeQuestTrackerType
} = questTrackerSlice.actions;

export default questTrackerSlice.reducer;
