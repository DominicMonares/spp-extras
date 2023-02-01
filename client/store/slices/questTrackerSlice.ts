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
      state.characterClass.value = action.payload.characterClass.value;
    },
    storeQuestTrackerRace: (state, action: PayloadAction<QuestTrackerSettings>) => {
      if (!state.race) state.race = {};
      state.race.id = action.payload.race.id;
      state.race.value = action.payload.race.value;
    },
    storeQuestTrackerCharacter: (state, action: PayloadAction<QuestTrackerSettings>) => {
      state.character = action.payload.character;
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
