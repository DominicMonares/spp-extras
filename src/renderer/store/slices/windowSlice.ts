import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  windowHeight: number;
}

const initialState: InitialState = {
  windowHeight: window.innerHeight,
}

export const windowSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {
    storeWindowHeight: (state, action: PayloadAction<number>) => {
      state.windowHeight = action.payload;
    },
  },
});

export const { storeWindowHeight } = windowSlice.actions;
export default windowSlice.reducer;
