import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchLocation = createAsyncThunk('gameStatus/fetchLocation', async (coords) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${process.env.REACT_APP_GMAPS_API_KEY}`;

  const response = await fetch(url);
  const result = await response.json();
  console.log(result.results[5].formatted_address);
  return { coords, location: result.results[5].formatted_address };
});

export const gameStatusSlice = createSlice({
  name: 'gameStatus',
  initialState: {
    coords: {},
    location: '',
    isGameStarted: false,
    searchCoords: {},
  },
  reducers: {
    gameStartToggle(state) {
      state.isGameStarted = !state.isGameStarted;
    },
    searchCoordsToggle(state, { payload }) {
      state.searchCoords = payload;
    },
  },
  extraReducers: {
    [fetchLocation.fulfilled]: (state, { payload }) => {
      return { ...state, ...payload };
    },
  },
});

export const { gameStartToggle, searchCoordsToggle } = gameStatusSlice.actions;
