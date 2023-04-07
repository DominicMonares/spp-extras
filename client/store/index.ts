import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './slices/characterSlice';
import expansionReducer from './slices/expansionSlice';
import factionReducer from './slices/factionSlice';
import questReducer from './slices/questSlice';
import questTrackerReducer from './slices/questTrackerSlice';
import toolReducer from './slices/toolSlice';
import websocketReducer from './slices/websocketSlice';
import windowReducer from './slices/windowSlice';


export const store = configureStore({
  reducer: {
    characters: characterReducer,
    expansion: expansionReducer,
    faction: factionReducer,
    quests: questReducer,
    tool: toolReducer,
    questTracker: questTrackerReducer,
    websocket: websocketReducer,
    window: windowReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
