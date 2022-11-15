// Redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
import { QuestTrackerFilter } from '../../types/quests';


const initialState: QuestTrackerFilter = {};

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
    },
    updateQTType: (state, action: PayloadAction<QuestTrackerFilter>) => {
      state.type = action.payload.type;
    }
  }
});

export const { 
  updateQTFaction,
  updateQTZone,
  updateQTRace,
  updateQTClass,
  updateQTCharacter,
  updateQTType
} = questTrackerSlice.actions;

export default questTrackerSlice.reducer;
