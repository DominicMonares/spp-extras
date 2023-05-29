import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Accounts } from '../../../types';

interface InitialState {
  all: Accounts;
}

const initialState: InitialState = {
  all: {},
};

export const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    storeAccounts: (state, action: PayloadAction<Accounts>) => {
      state.all = action.payload;
    },
  },
});

export const { storeAccounts } = accountSlice.actions;
export default accountSlice.reducer;
