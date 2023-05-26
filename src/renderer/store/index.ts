import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slices/accountSlice';
import expansionReducer from './slices/expansionSlice';
import factionReducer from './slices/factionSlice';
import questReducer from './slices/questSlice';
import questTrackerReducer from './slices/questTrackerSlice';
import toolReducer from './slices/toolSlice';
import websocketReducer from './slices/websocketSlice';
import windowReducer from './slices/windowSlice';


export const store = configureStore({
  reducer: {
    accounts: accountReducer,
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
