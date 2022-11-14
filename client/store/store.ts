// Redux
import { configureStore } from '@reduxjs/toolkit';

// Slices
import expansionReducer from './slices/expansionSlice';
import characterReducer from './slices/characterSlice';
import featureReducer from './slices/featureSlice';
import completedQuestReducer from './slices/completedQuestSlice';
import allQuestReducer from './slices/allQuestSlice';
import questTrackerReducer from './slices/questTrackerSlice';
import dropdownReducer from './slices/dropdownSlice';


export const store = configureStore({
  reducer: {
    expansion: expansionReducer,
    characters: characterReducer,
    feature: featureReducer,
    completedQuests: completedQuestReducer,
    allQuests: allQuestReducer,
    questTracker: questTrackerReducer,
    dropdown: dropdownReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
