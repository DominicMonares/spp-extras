import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Expansion } from '../types';

const initialState: Expansion = {
  expansion: 'vanilla'
}

export const expansionSlice = createSlice({
  name: 'expansion',
  initialState,
  reducers: {
    updateExpansion: (state, action: PayloadAction<string>) => {
      state.expansion = action.payload;
    }
  }
});

export const { updateExpansion } = expansionSlice.actions;

export default expansionSlice.reducer;
