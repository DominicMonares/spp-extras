import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expansion, ExpansionSliceState } from '../../types';


const defaultSelected = () => {
  return window.electron.getExpansion();
}

const initialState: ExpansionSliceState = {
  selected: defaultSelected()
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
