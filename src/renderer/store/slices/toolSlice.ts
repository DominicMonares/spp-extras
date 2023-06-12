import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedTool } from 'types';

type InitialState = {
  selected: SelectedTool;
}

const initialState: InitialState = {
  selected: '',
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
