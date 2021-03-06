import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLocation,
  gameStartToggle,
  nullLocation,
} from "../../redux/gameStatusSlice";
import style from "./startMap.module.css";
import { Button } from "../button/Button";
import { CSSTransition } from "react-transition-group";
import "./location.css";

export default function StartMap() {
  const { location } = useSelector((state) => state.gameStatus);
  const dispatch = useDispatch();
  let [markerPosition, setMarkerPosition] = useState({});

  let center = {
    lat: 55.76063062407006,
    lng: 37.6363135809925,
  };

  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    if (window.innerWidth > 1000) {
      setWindowSize(900);
    }
    if (window.innerWidth < 1000) {
      setWindowSize(700);
    }
  }, []);

  const handleWindowResize = useCallback(
    (event) => {
      if (window.innerWidth > 1000) {
        setWindowSize(900);
      }
      if (window.innerWidth < 1000) {
        setWindowSize(700);
      }
    },
    [window.innerWidth]
  );

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);

  return (
    <>
      <div
        className={style.mapContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CSSTransition
          in={location}
          timeout={700}
          classNames="location"
          mountOnEnter
          unmountOnExit
        >
          <div className={style.modalContent}>
            <div
              className={style.btnSmall}
              onClick={async (e) => {
                e.stopPropagation();
                dispatch(nullLocation());
              }}
            ></div>
            <div className={style.modalColumn}>
              <h3>{location}</h3>
              <hr />
              <div className={style.btnWrap}></div>
              <div className={style.righted}>
                <Button
                  text="??????????????"
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
              mapContainerStyle={{
                width: `${windowSize}px`,
                height: "750px",
              }}
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
