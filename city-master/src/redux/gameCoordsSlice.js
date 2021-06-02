import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchLocation = createAsyncThunk('gameCoords/fetchLocation', async (coords) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${process.env.REACT_APP_GMAPS_API_KEY}`;

  const response = await fetch(url);
  const result = await response.json();
  console.log(result.results[5].formatted_address);
  return { coords, location: result.results[5].formatted_address };
});

export const gameCoordsSlice = createSlice({
  name: 'gameCoords',
  initialState: {
    coords: {},
    location: '',
  },
  reducers: {
    addGameCoodrs(state, action) {
      return action.payload;
    },
  },
  extraReducers: {
    [fetchLocation.fulfilled]: (state, { payload }) => {
      return payload;
    },
  },
});

export const { addGameCoodrs } = gameCoordsSlice.actions;
