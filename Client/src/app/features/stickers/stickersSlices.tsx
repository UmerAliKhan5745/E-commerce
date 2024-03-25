// app/features/stickers/stickersSlice.ts

import { createSlice } from '@reduxjs/toolkit';

export const stickersSlice = createSlice({
  name: 'stickers',
  initialState: [],
  reducers: {
    fetchStickersSuccess(state, action) {
      return action.payload;
    },
  },
});

export const { fetchStickersSuccess } = stickersSlice.actions;

export default stickersSlice.reducer;
