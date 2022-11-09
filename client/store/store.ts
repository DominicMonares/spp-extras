import { configureStore } from '@reduxjs/toolkit';

import expansionReducer from './slices/expansionSlice';
import characterReducer from './slices/characterSlice';
import featureReducer from './slices/featureSlice';
import completedQuestReducer from './slices/questSlice';


export const store = configureStore({
  reducer: {
    expansion: expansionReducer,
    characters: characterReducer,
    feature: featureReducer,
    completedQuests: completedQuestReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
