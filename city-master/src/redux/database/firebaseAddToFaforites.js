import axios from "axios";

const url = process.env.REACT_APP_DATABASE_URL;

export const addToFavorites = async (uid, place, searchCoords) => {
  try {
    const res = await axios.post(`${url}/users/${uid}/favorites.json`, {
      place,
      lat: searchCoords.lat,
      lng: searchCoords.lng,
    });

    return res.data.name;
  } catch (e) {
    throw new Error(e.message);
  }
};
