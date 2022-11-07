import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Feature, SelectedFeature } from '../types';

const initialState: Feature = {
  // selected: null
  selected: 'quest_tracker'
}

export const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    updateFeature: (state, action: PayloadAction<SelectedFeature>) => {
      state.selected = action.payload;
    }
  }
});

export const { updateFeature } = featureSlice.actions;

export default featureSlice.reducer;
