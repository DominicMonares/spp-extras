// Redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
import { QuestTrackerSettings } from '../../types/quests';


const initialState: QuestTrackerSettings = {
  type: 'reg'
};

export const questTrackerSlice = createSlice({
  name: 'questTracker',
  initialState,
  reducers: {
    updateQTFaction: (state, action: PayloadAction<QuestTrackerSettings>) => {
      state.faction = action.payload.faction;
    },
    updateQTZone: (state, action: PayloadAction<QuestTrackerSettings>) => {
      state.zone = action.payload.zone;
    },
    updateQTRace: (state, action: PayloadAction<QuestTrackerSettings>) => {
      state.race = action.payload.race;
    },
    updateQTClass: (state, action: PayloadAction<QuestTrackerSettings>) => {
      state.charClass.id = action.payload.charClass.id;
      state.charClass.value = action.payload.charClass.value;
    },
    updateQTCharacter: (state, action: PayloadAction<QuestTrackerSettings>) => {
      state.race = null;
      state.charClass = null;
      state.character = action.payload.character;
    },
    updateQTType: (state, action: PayloadAction<QuestTrackerSettings>) => {
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
