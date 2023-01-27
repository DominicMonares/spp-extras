import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TemplateQuests } from '../../types';


const initialState: TemplateQuests = {
  alliance: {},
  horde: {},
  both: {}
}

export const templateQuestSlice = createSlice({
  name: 'templateQuests',
  initialState,
  reducers: {
    storeTemplateQuests: (state, action: PayloadAction<TemplateQuests>) => {
      state.alliance = action.payload.alliance;
      state.horde = action.payload.horde;
      state.both = action.payload.both;
    }
  }
});

export const { storeTemplateQuests } = templateQuestSlice.actions;
export default templateQuestSlice.reducer;
