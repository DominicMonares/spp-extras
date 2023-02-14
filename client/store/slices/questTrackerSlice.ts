import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestTrackerSettings, QuestType } from '../../types';


const initialState: QuestTrackerSettings = {
  faction: 'alliance'
};

export const questTrackerSlice = createSlice({
  name: 'questTracker',
  initialState,
  reducers: {
    storeQuestTrackerCharacter: (state, action: PayloadAction<QuestTrackerSettings>) => {
      if (!state.character) state.character = {};
      if (action.payload.character.id === 0) {
        delete state.character;
      } else {
        state.character.id = action.payload.character.id;
        state.character.name = action.payload.character.name;
        state.character.value = action.payload.character.value;
      }

      if (state.race) delete state.race;
      if (state.characterClass) delete state.characterClass;
    },
    storeQuestTrackerClass: (state, action: PayloadAction<QuestTrackerSettings>) => {
      if (!state.characterClass) state.characterClass = {};
      if (action.payload.characterClass.id as number === 0) {
        delete state.characterClass;
      } else {
        state.characterClass.id = action.payload.characterClass.id;
        state.characterClass.title = action.payload.characterClass.title;
        state.characterClass.value = action.payload.characterClass.value;
      }
      
      if (state.zone) delete state.zone;
    },
    storeQuestTrackerFaction: (state, action: PayloadAction<QuestTrackerSettings>) => {
      state.faction = action.payload.faction;
      if (state.characterClass) delete state.characterClass;
      if (state.race) delete state.race;
      if (state.character) delete state.character;
    },
    storeQuestTrackerRace: (state, action: PayloadAction<QuestTrackerSettings>) => {
      if (!state.race) state.race = {};
      if (action.payload.race.id as number === 0) {
        delete state.race;
      } else {
        state.race.id = action.payload.race.id;
        state.race.title = action.payload.race.title;
        state.race.value = action.payload.race.value;
      }

      if (state.zone) delete state.zone;
    },
    storeQuestTrackerType: (state, action: PayloadAction<QuestTrackerSettings>) => {
      if (action.payload.type.toLowerCase() === 'all quest types') {
        delete state.type;
      } else {
        state.type = action.payload.type.toLowerCase() as QuestType;
      }
    },
    storeQuestTrackerZone: (state, action: PayloadAction<QuestTrackerSettings>) => {
      if (action.payload.zone === 'All Zones') {
        delete state.zone;
      } else {
        state.zone = action.payload.zone;
      }

      if (state.characterClass) delete state.characterClass;
      if (state.race) delete state.race;
    }
  }
});

export const {
  storeQuestTrackerCharacter,
  storeQuestTrackerClass,
  storeQuestTrackerFaction,
  storeQuestTrackerRace,
  storeQuestTrackerType,
  storeQuestTrackerZone
} = questTrackerSlice.actions;

export default questTrackerSlice.reducer;
