import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Characters } from '../../types';


const initialState: Characters = {
  alliance: {},
  horde: {}
}

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    updateCharacters: (state, action: PayloadAction<Characters>) => {
      const alliance = action.payload.alliance;
      const horde = action.payload.horde;
      if (alliance) state.alliance = alliance;
      if (horde) state.horde = horde;
    }
  }
});

export const { updateCharacters } = characterSlice.actions;
export default characterSlice.reducer;
