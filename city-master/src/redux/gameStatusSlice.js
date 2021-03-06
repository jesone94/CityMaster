import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLocation = createAsyncThunk(
  "gameStatus/fetchLocation",
  async (coords) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${process.env.REACT_APP_GMAPS_API_KEY}`;

    const response = await fetch(url);
    const result = await response.json();

    return { coords, location: result.results[5].formatted_address };
  }
);

export const gameStatusSlice = createSlice({
  name: "gameStatus",
  initialState: {
    coords: {},
    location: "",
    isGameStarted: false,
    searchCoords: {},
    currentImgUrl: "",
    currentImgCoords: {},
    answerCoords: null,
    answerDistance: 0,
    auction: false,
  },
  reducers: {
    nullLocation(state) {
      state.location = "";
    },
    gameStartToggle(state) {
      state.isGameStarted = !state.isGameStarted;
    },
    searchCoordsToggle(state, { payload }) {
      state.searchCoords = payload;
    },
    toggleCurrentImg(state, { payload }) {
      const url = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${payload.lat},${payload.lng}&heading=151.78&pitch=-0.76&key=AIzaSyD3H4_6o49rkozd-z0jJZWH-4GbRFpMsMU&return_error_codes=true`;
      state.currentImgUrl = url;
      state.currentImgCoords = payload;
    },
    toggleDistance(state, { payload }) {
      state.answerDistance = payload;
    },
    toggleAnswerCoords(state, { payload }) {
      state.answerCoords = payload;
    },
    clearCurrentImgUrl(state) {
      state.currentImgUrl = null;
    },
    resetGameStatus(state) {
      state.coords = {};
      state.location = "";
      state.isGameStarted = false;
      state.searchCoords = {};
      state.currentImgUrl = "";
      state.currentImgCoords = {};
      state.answerCoords = null;
      state.answerDistance = 0;
    },
    toggleAuction(state) {
      state.auction = !state.auction;
    },
  },
  extraReducers: {
    [fetchLocation.pending]: (state) => {},
    [fetchLocation.fulfilled]: (state, { payload }) => {
      return { ...state, ...payload };
    },
  },
});

export const {
  gameStartToggle,
  searchCoordsToggle,
  toggleCurrentImg,
  nullLocation,
  toggleDistance,
  toggleAnswerCoords,
  clearCurrentImgUrl,
  resetGameStatus,
  toggleAuction,
} = gameStatusSlice.actions;
