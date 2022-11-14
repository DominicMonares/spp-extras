// Redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
import { Expansion, SelectedExpansion } from '../../types/general';


const initialState: Expansion = {
  // selected: null
  selected: 'classic' // temp default
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
