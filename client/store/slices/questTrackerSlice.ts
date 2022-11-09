import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { QuestTrackerFilter } from '../types';

const initialState: QuestTrackerFilter = {
  faction: null,
  zone: null,
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
    updateQTZone: (state, action: PayloadAction<QuestTrackerFilter>) => {
      state.zone = action.payload.zone;
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
  updateQTFaction, 
  updateQTZone, 
  updateQTRace, 
  updateQTClass, 
  updateQTCharacter 
} = questTrackerSlice.actions;

export default questTrackerSlice.reducer;
