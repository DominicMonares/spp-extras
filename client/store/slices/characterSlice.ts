import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Characters, CharactersInitSlice } from '../../types';


const initialState: Characters = {
  alliance: {},
  horde: {}
};

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    storeCharacters: (state, action: PayloadAction<Characters>) => {
      state.alliance = action.payload.alliance;
      state.horde = action.payload.horde;
    }
  }
});

export const { storeCharacters } = characterSlice.actions;

export default characterSlice.reducer;
