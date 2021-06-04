import React, { Children, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { addGameCoodrs, fetchLocation } from '../../redux/gameCoordsSlice';
import { Button } from '@material-ui/core';
import style from './startMap.module.css'
import { Spinner } from './Spinner';

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  var crd = pos.coords;
  const coords = { lat: crd.latitude, lng: crd.longitude };
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

const containerStyle = {
  width: '800px',
  height: '600px',
};

let center = {
  lat: 60,
  lng: 100,
};

// console.log(navigator.geolocation.getCurrentPosition());

export default function StartMap() {
  const { location } = useSelector((state) => state.gameCoords);
  const dispatch = useDispatch();
  let [markerPosition, setMarkerPosition] = useState({});

  return (
    <div className={style.mapContainer}>
     {/* <div className={style.spinnerModal}><Spinner /></div> */}
      <div className={style.modalContent}>
        
      
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GMAPS_API_KEY}>
      {location && (
        <Button size='large' variant='outlined' color='primary'>
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
    </div>

    </div>
  );
}
