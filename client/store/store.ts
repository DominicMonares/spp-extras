import { configureStore } from '@reduxjs/toolkit';
import expansionReducer from './slices/expansionSlice';

export const store = configureStore({
  reducer: {
    expansion: expansionReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
