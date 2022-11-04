import { configureStore } from '@reduxjs/toolkit';
import expansionReducer from './slices/expansionSlice';
import characterReducer from './slices/characterSlice';


export const store = configureStore({
  reducer: {
    expansion: expansionReducer,
    characters: characterReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
