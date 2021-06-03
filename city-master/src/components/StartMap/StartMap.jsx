import React, { Children, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import {
  addGameCoodrs,
  fetchLocation,
  gameStartToggle,
  searchCoordsToggle,
} from '../../redux/gameStatusSlice';
import { Button } from '@material-ui/core';
import cordsRandomazer from './coordRamdomazer';

const containerStyle = {
  width: '800px',
  height: '600px',
};

let center = {
  lat: 55.76063062407006,
  lng: 37.6363135809925,
};

// console.log(navigator.geolocation.getCurrentPosition());

export default function StartMap() {
  const { location, coords, isGameStarted } = useSelector((state) => state.gameStatus);
  const dispatch = useDispatch();
  let [markerPosition, setMarkerPosition] = useState({});

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GMAPS_API_KEY}>
      {location && (
        <Button
          size='large'
          variant='outlined'
          color='primary'
          onClick={() => {
            dispatch(gameStartToggle());
          }}
        >
          Выбрать<br></br>
          {location}
        </Button>
      )}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={(ev) => {
          const coords = { lat: ev.latLng.lat(), lng: ev.latLng.lng() };
          setMarkerPosition(coords);
          dispatch(fetchLocation(coords));
        }}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
}
