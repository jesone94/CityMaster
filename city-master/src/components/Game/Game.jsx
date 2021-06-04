import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import {
  searchCoordsToggle,
  toggleCurrentImg,
} from "../../redux/gameStatusSlice";
import cordsRandomazer from "../StartMap/coordRamdomazer";
import { Button } from "../button/Button";
import "./modalGame.css";
import style from "./game.module.css";

export default function Game() {
  const [answerCoords, setAnswerCoords] = useState({});
  const containerStyle = {
    width: "600px",
    height: "300px",
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
    if (result.status === "OK") {
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

  const [toggler, setToggler] = useState(false);

  useEffect(() => {
    dispatch(searchCoordsToggle(cordsRandomazer(coords)));
  }, []);
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GMAPS_API_KEY}>
      <div
        className={style.gameContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CSSTransition
          in={toggler}
          timeout={700}
          classNames="modal"
          mountOnEnter
          unmountOnExit
        >
          <div className={style.modalContent}>
            <div
              className={style.btnSmall}
              onClick={async (e) => {
                e.stopPropagation();
                setToggler(false)
              }}
            ></div>
            <div className={style.modalColumn}>
              <h3>AAAAAAAAa</h3>
              <hr />
              <div className={style.btnWrap}></div>
              <div className={style.righted}>
                <Button text="Выбрать"></Button>
              </div>
            </div>
          </div>
        </CSSTransition>
        <div>
          <img src={currentImgUrl}></img>
        </div>
        <div className={style.btnThisIsLocation}>
        <Button
          text="Это здесь!"
          click={() => {
            setToggler((prev) => !prev);
          }}
        />
        </div>
        <div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onClick={(ev) => {
              const coords = { lat: ev.latLng.lat(), lng: ev.latLng.lng() };
              setAnswerCoords(coords);
              console.log(answerCoords);
            }}
          >
            <Marker position={answerCoords} />
          </GoogleMap>
        </div>
      </div>
    </LoadScript>
  );
}
