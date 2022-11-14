// Redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
import { DropdownType } from '../../types/dropdown';


const initialState: DropdownType = {
  type: null
}

export const dropdownSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    updateDropdown: (state, action: PayloadAction<DropdownType>) => {
      state.type = action.payload.type;
    }
  }
});

export const { updateDropdown } = dropdownSlice.actions;
export default dropdownSlice.reducer;
