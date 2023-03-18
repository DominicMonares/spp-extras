import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  CompletedQuests,
  QuestSliceInitState,
  TemplateQuests
} from '../../types';


const initialState: QuestSliceInitState = {
  completedQuests: {},
  templateQuests: {}
};

export const questSlice = createSlice({
  name: 'quests',
  initialState,
  reducers: {
    storeCompletedQuests: (state, action: PayloadAction<CompletedQuests>) => {
      state.completedQuests = action.payload;
    },
    storeTemplateQuests: (state, action: PayloadAction<TemplateQuests>) => {
      state.templateQuests = action.payload;
    }
  }
});

export const {
  storeCompletedQuests,
  storeTemplateQuests
} = questSlice.actions;

export default questSlice.reducer;
