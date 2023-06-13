import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedTool } from 'types';

type InitialState = {
  selected: SelectedTool;
  collapsed: boolean;
}

const initialState: InitialState = {
  selected: '',
  collapsed: false,
}

export const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    storeTool: (state, action: PayloadAction<SelectedTool>) => {
      state.selected = action.payload;
    },
    storeToolCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    },
  },
});

export const { storeTool, storeToolCollapsed } = toolSlice.actions;
export default toolSlice.reducer;
