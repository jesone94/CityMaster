import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.REACT_APP_DATABASE_URL;

export const fetchUserRemoveFavoriteElement = createAsyncThunk("user/fetchUserRemoveFavoriteElement", async ({uid, id}) => {
  try {
    await axios.delete(`${url}/users/${uid}/favorites/${id}.json`)
    return id
  } catch (e) {
    return console.log(e);
  }
});
