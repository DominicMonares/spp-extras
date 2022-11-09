import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { QuestTrackerFilter } from '../types';

const initialState: QuestTrackerFilter = {
  faction: 'alliance',
  race: null,
  class: null,
  character: null
}

export const questTrackerSlice = createSlice({
  name: 'questTracker',
  initialState,
  reducers: {
    updateQTFaction: (state, action: PayloadAction<QuestTrackerFilter>) => {
      state.faction = action.payload.faction;
    },
    updateQTRace: (state, action: PayloadAction<QuestTrackerFilter>) => {
      state.race = action.payload.race;
    },
    updateQTClass: (state, action: PayloadAction<QuestTrackerFilter>) => {
      state.class = action.payload.class;
    },
    updateQTCharacter: (state, action: PayloadAction<QuestTrackerFilter>) => {
      state.race = null;
      state.class = null;
      state.character = action.payload.character;
    }
  }
});

export const { 
  updateQTFaction, updateQTRace, updateQTClass, updateQTCharacter 
} = questTrackerSlice.actions;

export default questTrackerSlice.reducer;
