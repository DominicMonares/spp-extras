import { configureStore } from '@reduxjs/toolkit';

import expansionReducer from './slices/expansionSlice';
import characterReducer from './slices/characterSlice';
import featureReducer from './slices/featureSlice';


export const store = configureStore({
  reducer: {
    expansion: expansionReducer,
    characters: characterReducer,
    feature: featureReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
