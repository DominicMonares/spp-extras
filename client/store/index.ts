import { configureStore } from '@reduxjs/toolkit';
import expansionReducer from './slices/expansionSlice';
import featureReducer from './slices/toolSlice';
import questTrackerReducer from './slices/questTrackerSlice';


export const store = configureStore({
  reducer: {
    expansion: expansionReducer,
    feature: featureReducer,
    questTracker: questTrackerReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
