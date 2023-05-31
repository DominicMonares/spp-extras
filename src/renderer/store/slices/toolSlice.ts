import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedTool } from '../../../types';

interface InitialState {
  selected: SelectedTool;
}

const initialState: InitialState = {
  selected: 'accountWide', // TEMP DEFAULT
}

export const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    storeTool: (state, action: PayloadAction<SelectedTool>) => {
      state.selected = action.payload;
    },
  },
});

export const { storeTool } = toolSlice.actions;
export default toolSlice.reducer;
