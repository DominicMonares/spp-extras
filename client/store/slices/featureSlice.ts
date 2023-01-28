import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Feature, SelectedFeature } from '../../types';


const initialState: Feature = {
  // selected: null
  selected: 'awAchieves' // temp default
}

export const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    storeFeature: (state, action: PayloadAction<SelectedFeature>) => {
      state.selected = action.payload;
    }
  }
});

export const { storeFeature } = featureSlice.actions;
export default featureSlice.reducer;
