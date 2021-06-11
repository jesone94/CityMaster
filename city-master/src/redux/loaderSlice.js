import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    display: false,
  },
  reducers: {
    addLoader(state) {
      state.display = true;
    },
    removeLoader(state) {
      state.display = false;
    },
  },
});

export default loaderSlice;
export const { addLoader, removeLoader } = loaderSlice.actions;
