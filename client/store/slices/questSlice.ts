import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CompletedQuests } from '../types';

const initialState: CompletedQuests = {
  alliance: null,
  horde: null
}

export const completedQuestReducer = createSlice({
  name: 'completedQuests',
  initialState,
  reducers: {
    updateCompletedQuests: (state, action: PayloadAction<CompletedQuests>) => {
      state = action.payload;
    }
  }
});

export const { updateCompletedQuests } = completedQuestReducer.actions;

export default completedQuestReducer.reducer;
