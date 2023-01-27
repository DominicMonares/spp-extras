import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompletedQuests } from '../../types';


const initialState: CompletedQuests = {
  alliance: {},
  horde: {}
}

export const completedQuestSlice = createSlice({
  name: 'completedQuests',
  initialState,
  reducers: {
    storeCompletedQuests: (state, action: PayloadAction<CompletedQuests>) => {
      state.alliance = action.payload.alliance;
      state.horde = action.payload.horde;
    }
  }
});

export const { storeCompletedQuests } = completedQuestSlice.actions;
export default completedQuestSlice.reducer;
