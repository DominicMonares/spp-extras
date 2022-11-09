import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CompletedQuests } from '../types';

const initialState: CompletedQuests = {
  alliance: {},
  horde: {}
}

export const completedQuestReducer = createSlice({
  name: 'completedQuests',
  initialState,
  reducers: {
    updateCompletedQuests: (state, action: PayloadAction<CompletedQuests>) => {
      state.alliance = action.payload.alliance;
      state.horde = action.payload.horde;
    }
  }
});

export const { updateCompletedQuests } = completedQuestReducer.actions;

export default completedQuestReducer.reducer;
