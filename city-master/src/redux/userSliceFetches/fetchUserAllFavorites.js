import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.REACT_APP_DATABASE_URL;

export const fetchUserAllFavorites = createAsyncThunk(
  "user/fetchUserAllFavorites",
  async (uid) => {
    try {
      const res = await axios.get(`${url}/users/${uid}/favorites.json`);

      if (res.data){
        const payload = Object.keys(res.data).map((key) => {
          return {
            ...res.data[key],
            id: key,
          };
        });
        return payload;
      }
      return []
    } catch (e) {
      return console.log(e);
    }
  }
);
