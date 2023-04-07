import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
  messages: []
};

export const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    storeMessages: (state, action: PayloadAction<string>) => {
      if (action.payload === 'del') {
        state.messages = [];
      } else {
        state.messages.push(action.payload);
      }
    }
  }
});

export const { storeMessages } = websocketSlice.actions;

export default websocketSlice.reducer;
