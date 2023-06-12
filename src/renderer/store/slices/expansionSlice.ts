import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expansion, ExpansionSetting } from 'types';

type InitialState = {
  selected: ExpansionSetting;
}

const initialState: InitialState = {
  selected: '',
}

export const expansionSlice = createSlice({
  name: 'expansion',
  initialState,
  reducers: {
    storeExpansion: (state, action: PayloadAction<Expansion>) => {
      state.selected = action.payload;
    },
  },
});

export const { storeExpansion } = expansionSlice.actions;
export default expansionSlice.reducer;
