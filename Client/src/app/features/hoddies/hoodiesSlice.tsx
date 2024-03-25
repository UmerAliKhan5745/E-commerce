// hoodiesSlice.ts

import { createSlice } from '@reduxjs/toolkit';

export const hoodiesSlice = createSlice({
  name: 'hoodies',
  initialState: [],
  reducers: {
    fetchHoodiesSuccess(state, action) { // Corrected action name
      return action.payload;
    },
  },
});

export const { fetchHoodiesSuccess } = hoodiesSlice.actions; // Corrected action name

export default hoodiesSlice.reducer;
