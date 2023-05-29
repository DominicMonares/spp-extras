import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expansion, ReduxInitialExpansion } from '../../../types';


const initialState: ReduxInitialExpansion = {
  selected: ''
}

export const expansionSlice = createSlice({
  name: 'expansion',
  initialState,
  reducers: {
    storeExpansion: (state, action: PayloadAction<Expansion>) => {
      state.selected = action.payload;
    }
  }
});

export const { storeExpansion } = expansionSlice.actions;
export default expansionSlice.reducer;
