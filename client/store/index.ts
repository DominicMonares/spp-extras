import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './slices/characterSlice';
import expansionReducer from './slices/expansionSlice';
import questReducer from './slices/questSlice';
import toolReducer from './slices/toolSlice';
import questTrackerReducer from './slices/questTrackerSlice';


export const store = configureStore({
  reducer: {
    characters: characterReducer,
    expansion: expansionReducer,
    quests: questReducer,
    tool: toolReducer,
    questTracker: questTrackerReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
