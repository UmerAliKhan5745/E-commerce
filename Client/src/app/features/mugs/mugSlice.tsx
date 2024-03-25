// app/features/stickers/stickersSlice.ts
import { createSlice } from '@reduxjs/toolkit';
export const mugsSlice = createSlice({
  name: 'mugs',
  initialState: [],
  reducers: {
    fetchmugsSuccess(state, action) {   
      return action.payload;
    },
  },
});
export const { fetchmugsSuccess } = mugsSlice.actions;

export default mugsSlice.reducer;
