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
    storeQuestTrackerZone: (state, action: PayloadAction<QuestTrackerSettings>) => {
      state.zone = action.payload.zone;
    },
    storeQuestTrackerRace: (state, action: PayloadAction<QuestTrackerSettings>) => {
      state.race = action.payload.race;
    },
    storeQuestTrackerClass: (state, action: PayloadAction<QuestTrackerSettings>) => {
      state.characterClass.id = action.payload.characterClass.id;
      state.characterClass.value = action.payload.characterClass.value;
    },
    storeQuestTrackerCharacter: (state, action: PayloadAction<QuestTrackerSettings>) => {
      state.race = null;
      state.characterClass = null;
      state.character = action.payload.character;
    },
    storeQuestTrackerType: (state, action: PayloadAction<QuestTrackerSettings>) => {
      state.type = action.payload.type;
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
