import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expansion, SelectedExpansion } from '../../types';


const initialState: Expansion = {
  // selected: null
  selected: 'classic' // temp default
}

export const expansionSlice = createSlice({
  name: 'wotlk',
  initialState,
  reducers: {
    storeExpansion: (state, action: PayloadAction<SelectedExpansion>) => {
      state.selected = action.payload;
    }
  }
});

export const { storeExpansion } = expansionSlice.actions;
export default expansionSlice.reducer;
