import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Accounts, ReduxInitialCharacters } from '../../types';


const initialState: ReduxInitialCharacters = {
  all: {}
};

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    storeCharacters: (state, action: PayloadAction<Accounts>) => {
      state.all = action.payload;
    }
  }
});

export const { storeCharacters } = characterSlice.actions;

export default characterSlice.reducer;
