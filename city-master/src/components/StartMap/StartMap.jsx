import React, { Children, useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import {
  addGameCoodrs,
  fetchLocation,
  gameStartToggle,
  nullLocation,
  searchCoordsToggle,
} from "../../redux/gameStatusSlice";
import style from "./startMap.module.css";
import { Button } from '../button/Button'
import { CSSTransition } from "react-transition-group";
import './location.css'

const containerStyle = {
  width: "900px",
  height: "750px",
};

let center = {
  lat: 55.76063062407006,
  lng: 37.6363135809925,
};

// console.log(navigator.geolocation.getCurrentPosition());

export default function StartMap() {
  const { location, coords, isGameStarted } = useSelector(
    (state) => state.gameStatus
  );
  const dispatch = useDispatch();
  let [markerPosition, setMarkerPosition] = useState({});

  return (
    <>
      <div className={style.mapContainer} onClick={(e) => {
        e.stopPropagation()
      }}>
        <CSSTransition 
          in={location}
          timeout={700}
          classNames='location'
          mountOnEnter
          unmountOnExit
        >
          <div className={style.modalContent}>
            <div
              className={style.btnSmall}
              onClick={async (e) => {
                e.stopPropagation();
                dispatch(nullLocation())
              }}
            ></div>
              <div className={style.modalColumn}>
                <h3>{location}</h3>
                <hr />
                <div className={style.btnWrap}></div>
                <div className={style.righted}>
                  <Button
                    text="Выбрать"
                    click={() => {
                      dispatch(gameStartToggle());
                    }}
                  ></Button>
              </div>
            </div>
          </div>
          </CSSTransition>
      
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GMAPS_API_KEY}>
        <div className={style.map}>
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
          </div>
        </LoadScript>
       
      </div>
    </>
  );
}
