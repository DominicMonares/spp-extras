import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompletedQuests, AllTemplateQuests } from '../../../types';

interface InitialState {
  completedQuests: CompletedQuests | Record<string,never>;
  templateQuests: AllTemplateQuests | Record<string,never>;
}

const initialState: InitialState = {
  completedQuests: {},
  templateQuests: {},
};

export const questSlice = createSlice({
  name: 'quests',
  initialState,
  reducers: {
    storeCompletedQuests: (state, action: PayloadAction<CompletedQuests>) => {
      state.completedQuests = action.payload;
    },
    storeTemplateQuests: (state, action: PayloadAction<AllTemplateQuests>) => {
      state.templateQuests = action.payload;
    },
  },
});

export const { storeCompletedQuests, storeTemplateQuests } = questSlice.actions;
export default questSlice.reducer;
