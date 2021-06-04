import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCoordsToggle } from '../../redux/gameStatusSlice';
import cordsRandomazer from '../StartMap/coordRamdomazer';

export default function Game() {
  const state = useSelector((state) => state.gameStatus);
  const dispatch = useDispatch();
  console.log(state);
  const { coords, searchCoords } = state;
  const searchLocation = useCallback(async () => {
    console.log(searchCoords);
    const url = `https://maps.googleapis.com/maps/api/streetview/metadata?size=600x300&location=${searchCoords.lat},${searchCoords.lng}&fov=90&heading=235&pitch=10&key=${process.env.REACT_APP_GMAPS_API_KEY}`;

    const response = await fetch(url);
    const result = await response.json();
    console.log(result.status);
    if (result.status === 'OK') {
      console.log('Нашли');
      return;
    } else {
      dispatch(searchCoordsToggle(cordsRandomazer(coords)));
    }
  }, [coords, searchCoords]);

  useEffect(() => {
    searchLocation();
  }, [searchLocation]);

  useEffect(() => {
    dispatch(searchCoordsToggle(cordsRandomazer(coords)));
  }, []);
  return (
    <>
      <div>Координаты поиска {searchCoords.lat}</div>
      <div>Это карта ответа</div>
    </>
  );
}
