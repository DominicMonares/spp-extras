import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AllQuests } from '../types';

const initialState: AllQuests = {
  alliance: {},
  horde: {},
  both: {}
}

export const allQuestSlice = createSlice({
  name: 'allQuests',
  initialState,
  reducers: {
    updateAllQuests: (state, action: PayloadAction<AllQuests>) => {
      state.alliance = action.payload.alliance;
      state.horde = action.payload.horde;
      state.both = action.payload.both;
    }
  }
});

export const { updateAllQuests } = allQuestSlice.actions;

export default allQuestSlice.reducer;
