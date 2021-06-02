import { createSlice } from '@reduxjs/toolkit';

export const gameCoordsSlice = createSlice({
  name: 'gameCoords',
  initialState: {},
  reducers: {
    addGameCoodrs(state, action) {
      return action.payload;
    },
  },
});

export const { addGameCoodrs } = gameCoordsSlice.actions;
