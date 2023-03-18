import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { windowIsSmall } from '../../utils';


interface Window { smallWindow: boolean }
const initialState: Window = {
  smallWindow: windowIsSmall()
}

export const windowSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {
    storeWindowWidth: (state, action: PayloadAction<boolean>) => {
      state.smallWindow = action.payload;
    }
  }
});

export const { storeWindowWidth } = windowSlice.actions;
export default windowSlice.reducer;
