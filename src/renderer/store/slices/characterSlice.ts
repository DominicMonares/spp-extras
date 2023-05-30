import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Characters } from '../../../types';

const initialState: Characters = {
  alliance: {},
  horde: {},
};

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    storeCharacters: (state, action: PayloadAction<Characters>) => {
      const payload = action.payload;
      if (!Object.keys(payload).length) {
        state.alliance = {};
        state.horde = {};
      } else {
        state.alliance = payload.alliance;
        state.horde = payload.horde;
      }
    },
  },
});

export const { storeCharacters } = characterSlice.actions;
export default characterSlice.reducer;
