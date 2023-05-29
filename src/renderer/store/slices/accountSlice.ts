import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Accounts, ReduxInitialAccounts } from '../../../types';


const initialState: ReduxInitialAccounts = {
  all: {}
};

export const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    storeAccounts: (state, action: PayloadAction<Accounts>) => {
      state.all = action.payload;
    }
  }
});

export const { storeAccounts } = accountSlice.actions;

export default accountSlice.reducer;
