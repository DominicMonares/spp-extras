import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Characters } from '../types';

const initialState: Characters = {
  characters: {
    alliance: {
      guid: null,
      account: null,
      name: null,
      race: null,
      class_field: null,
      account_name: null
    },
    horde: {
      guid: null,
      account: null,
      name: null,
      race: null,
      class_field: null,
      account_name: null
    }
  }
}

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    updateCharacters: (state, action: PayloadAction<Characters>) => {
      state = action.payload; // CHANGE THIS
    }
  }
});

export const { updateCharacters } = characterSlice.actions;

export default characterSlice.reducer;
