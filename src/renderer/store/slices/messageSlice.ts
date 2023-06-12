import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  all: string[];
}

const initialState: InitialState = {
  all: [],
};

export const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    storeMessages: (state, action: PayloadAction<string>) => {
      if (action.payload === 'del') {
        state.all = [];
      } else {
        state.all.push(action.payload);
      }
    },
  },
});

export const { storeMessages } = messageSlice.actions;
export default messageSlice.reducer;
