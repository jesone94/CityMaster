import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCoordsToggle, toggleCurrentImg } from '../../redux/gameStatusSlice';
import cordsRandomazer from '../StartMap/coordRamdomazer';

export default function Game() {
  const containerStyle = {
    width: '600px',
    height: '300px',
  };

  let center = {
    lat: 55.76063062407006,
    lng: 37.6363135809925,
  };
  const state = useSelector((state) => state.gameStatus);
  const dispatch = useDispatch();

  const { coords, searchCoords, currentImgUrl } = state;
  const searchLocation = useCallback(async () => {
    const url = `https://maps.googleapis.com/maps/api/streetview/metadata?size=600x300&location=${searchCoords.lat},${searchCoords.lng}&fov=90&heading=235&pitch=10&key=${process.env.REACT_APP_GMAPS_API_KEY}`;

    const response = await fetch(url);
    const result = await response.json();
    console.log(result.status);
    if (result.status === 'OK') {
      console.log(result);
      dispatch(toggleCurrentImg(result.location));
      return;
    } else {
      dispatch(searchCoordsToggle(cordsRandomazer(coords)));
    }
  }, [searchCoords]);

  useEffect(() => {
    searchLocation();
  }, [searchLocation]);

  useEffect(() => {
    dispatch(searchCoordsToggle(cordsRandomazer(coords)));
  }, []);
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GMAPS_API_KEY}>
      <div className='game'>
        {' '}
        <div>
          <img src={currentImgUrl}></img>
        </div>
        <div>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} />
        </div>
      </div>
    </LoadScript>
  );
}
