import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CompletedQuests } from '../types';

const initialState: CompletedQuests = {
  alliance: null,
  horde: null
}

export const questSlice = createSlice({
  name: 'quests',
  initialState,
  reducers: {
    updateQuests: (state, action: PayloadAction<CompletedQuests>) => {
      state = action.payload;
    }
  }
});

export const { updateQuests } = questSlice.actions;

export default questSlice.reducer;
