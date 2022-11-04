import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Expansion } from '../types';

const initialState: Expansion = {
  selected: 'vanilla'
}

export const expansionSlice = createSlice({
  name: 'expansion',
  initialState,
  reducers: {
    updateExpansion: (state, action: PayloadAction<string>) => {
      state.selected = action.payload;
    }
  }
});

export const { updateExpansion } = expansionSlice.actions;

export default expansionSlice.reducer;
