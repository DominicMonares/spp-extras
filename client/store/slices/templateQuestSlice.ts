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
    updateTemplateQuests: (state, action: PayloadAction<TemplateQuests>) => {
      state.alliance = action.payload.alliance;
      state.horde = action.payload.horde;
      state.both = action.payload.both;
    }
  }
});

export const { updateTemplateQuests } = templateQuestSlice.actions;
export default templateQuestSlice.reducer;
