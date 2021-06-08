import axios from "axios";
import firebase from "../../firebase/firebase";

const url = process.env.REACT_APP_DATABASE_URL;

export const addToFavorites = async (uid, place, searchCoords) => {
  try {
    const res = await axios.post(`${url}/users/${uid}/favorites.json`, {
      place, 
      lat: searchCoords.lat,
      lng: searchCoords.lng
    });
    const result = await res
    return result.data.name
  } catch (e) {
    throw new Error(e.message);
  }
};

// export const addToFavorites = (uid, place) =>
// firebase.database().ref(`users/${uid}/favorites`).push({ place })
//   .then(() => console.log('Успешно добавлено'))
//   .catch((e) => console.log(e))
