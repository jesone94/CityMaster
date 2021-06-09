import {
  GoogleMap,
  LoadScript,

  StreetViewPanorama,
} from "@react-google-maps/api";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import {
  clearCurrentImgUrl,
  resetGameStatus,
  searchCoordsToggle,
  toggleAnswerCoords,
  toggleCurrentImg,
  toggleDistance,
} from "../../redux/gameStatusSlice";
import cordsRandomazer from "../StartMap/coordRamdomazer";

import "../Game/modalGame.css";
import style from "../Game/game.module.css";


export default function Preview() {
  const panoramaOptions = {
    addressControl: false,
    motionTrackingControl: false,
    linksControl: false,
    enableCloseButton: false,
    showRoadLabels: false,
    clickToGo: false,
    disableDefaultUI: true,
  };

  const containerStyle = {
    width: "600px",
    height: "300px",
  };

  const state = useSelector((state) => state.gameStatus);
  const { uid } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [click, setClick] = useState(true)

  const {
    coords,
    searchCoords,
    currentImgUrl,
    currentImgCoords,
    answerDistance,
    answerCoords,
  } = state;

  const searchLocation = useCallback(async () => {
    const url = `https://maps.googleapis.com/maps/api/streetview/metadata?size=600x300&location=${searchCoords.lat},${searchCoords.lng}&fov=90&heading=235&pitch=10&key=${process.env.REACT_APP_GMAPS_API_KEY}`;
    /// вот на этот адрес отправляешь
    const response = await fetch(url);
    const result = await response.json();

    console.log(result);
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

  const [toggler, setToggler] = useState(false);

  useEffect(() => {
    dispatch(searchCoordsToggle(cordsRandomazer(coords)));
  }, []);



  return (
    
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
                setToggler(false);
              }}
            ></div>
            <div className={style.modalPanorama}>

              <hr />

              <GoogleMap
              mapContainerStyle={containerStyle}
              center={coords}
              zoom={10}
              streetView={false}

            >
              <StreetViewPanorama
                position={currentImgCoords}
                visible={true}
                options={panoramaOptions}
              />
            </GoogleMap>

            </div>
          </div>
        </CSSTransition>

      </div>
   
  );
}
