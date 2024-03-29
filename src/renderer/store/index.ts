import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './slices/characterSlice';
import expansionReducer from './slices/expansionSlice';
import factionReducer from './slices/factionSlice';
import questReducer from './slices/questSlice';
import questTrackerReducer from './slices/questTrackerSlice';
import toolReducer from './slices/toolSlice';
import messageReducer from './slices/messageSlice';
import windowReducer from './slices/windowSlice';


export const store = configureStore({
  reducer: {
    characters: characterReducer,
    expansion: expansionReducer,
    faction: factionReducer,
    quests: questReducer,
    tool: toolReducer,
    questTracker: questTrackerReducer,
    messages: messageReducer,
    window: windowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
