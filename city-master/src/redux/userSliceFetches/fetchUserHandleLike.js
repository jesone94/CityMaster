import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToFavorites } from "../database/firebaseAddToFaforites";


export const fetchUserHandleLike = createAsyncThunk("user/fetchUserHandleLike", async ({uid, searchCoords}) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${searchCoords.lat},${searchCoords.lng}&key=${process.env.REACT_APP_GMAPS_API_KEY}`;
    const response = await fetch(url);
    const result = await response.json();
    const id = await addToFavorites(uid, result.results[1].formatted_address, searchCoords)
    return {
      id,
      place: result.results[1].formatted_address,
      lat: searchCoords.lat,
      lng: searchCoords.lng
    }
  } catch (e) {
    return console.log(e);
  }
});
