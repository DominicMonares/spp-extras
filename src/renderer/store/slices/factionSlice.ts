import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Faction, ReduxInitialFaction } from '../../types/factions';


const initialState: ReduxInitialFaction = {
  selected: ''
}

export const factionSlice = createSlice({
  name: 'faction',
  initialState,
  reducers: {
    storeFaction: (state, action: PayloadAction<Faction>) => {
      state.selected = action.payload;
    }
  }
});

export const { storeFaction } = factionSlice.actions;
export default factionSlice.reducer;
