import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tool, SelectedTool } from '../../types';


const initialState: Tool = {
  // selected: null
  selected: 'questTracker' // temp default
}

export const toolSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    storeTool: (state, action: PayloadAction<SelectedTool>) => {
      state.selected = action.payload;
    }
  }
});

export const { storeTool } = toolSlice.actions;
export default toolSlice.reducer;
