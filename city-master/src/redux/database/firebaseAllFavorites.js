import axios from 'axios';
import { useDispatch } from 'react-redux';

const url = process.env.REACT_APP_DATABASE_URL;

export const fetchFavorites = async (uid) => {
  const res = await axios.get(`${url}/users/${uid}/favorites.json`);

  // const favorites = Object.keys(res.data).map(key => {
  //   return {
  //     ...res.data[key],
  //     id: key,
  //   }
  // })
  if (res.data) {
    const payload = Object.keys(res.data).map((key) => {
      return {
        ...res.data[key],
        id: key,
      };
    });
    if (payload) {
      return payload;
    }
    return [];
  }
};
