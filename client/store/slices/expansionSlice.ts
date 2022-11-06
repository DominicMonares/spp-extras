import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Expansion, SelectedExpansion } from '../types';

const initialState: Expansion = {
  // selected: null
  selected: 'classic'
}

export const expansionSlice = createSlice({
  name: 'expansion',
  initialState,
  reducers: {
    updateExpansion: (state, action: PayloadAction<SelectedExpansion>) => {
      state.selected = action.payload;
    }
  }
});

export const { updateExpansion } = expansionSlice.actions;

export default expansionSlice.reducer;
