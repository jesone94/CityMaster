import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
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
import { Button, ButtonLike } from "../button/Button";
import "./modalGame.css";
import style from "./game.module.css";
import * as geokit from "geokit";
import { addScore, reduceScore } from "../../redux/database/firebaseDatabse";
import { Loader } from "../loader/Loader";
import { fetchUserHandleLike } from "../../redux/userSliceFetches/fetchUserHandleLike";
import './btn.css'
import { userAddScore, userReduceScore } from "../../redux/userSlice";

export default function Game() {
  const panoramaOptions = {
    addressControl: false,
    motionTrackingControl: false,
    linksControl: false,
    enableCloseButton: false,
    showRoadLabels: false,
    clickToGo: false,
    disableDefaultUI: true,
  };
  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,

    zIndex: 1,
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

  const handleLike = async () => {
    dispatch(fetchUserHandleLike({searchCoords, uid}))

  }
  console.log(currentImgCoords, "CURRENT IMG COORDS")
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
                setToggler(false);
              }}
            ></div>
            <div className={style.modalColumn}>
              {answerDistance !== 0 && (
                <h3>
                  Ваше расстояние от точки вопроса{" "}
                  {String(answerDistance.toFixed(2))} км{" "}
                </h3>
              )}
              <hr />

              <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentImgCoords}
                zoom={11}
              >
                <Marker position={currentImgCoords} key={1} />
                <Marker
                  position={answerCoords}
                  key={2}
                  icon={
                    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                  }
                />

                <Polyline
                  path={[currentImgCoords, answerCoords]}
                  options={options}
                />
              </GoogleMap>

              <div className={style.btnWrap}></div>
              <div className={style.righted}>
                <Button
                  text="Продолжить"
                  click={() => {
                    if (answerDistance <= 1) {
                      addScore(uid, 150);
                      dispatch(userAddScore(150))
                      console.log("+");
                    } else if (answerDistance > 1 && answerDistance <= 3) {
                      addScore(uid, 100);
                      dispatch(userAddScore(100))
                    } else if (answerDistance > 3 && answerDistance <= 7) {
                      addScore(uid, 50);
                      dispatch(userAddScore(50))
                    } else if (answerDistance > 7 && answerDistance <= 10) {
                      addScore(uid, 0);
                      dispatch(userAddScore(0))
                    } else {
                      console.log("минус");
                      reduceScore(uid, 75);
                      dispatch(userReduceScore(75))
                    }

                    dispatch(searchCoordsToggle(cordsRandomazer(coords)));
                    dispatch(toggleDistance(0));
                    dispatch(toggleAnswerCoords(null));
                    dispatch(clearCurrentImgUrl());
                    setToggler(false);
                    setClick(true);
                  }}
                ></Button>
              </div>
            </div>
          </div>
        </CSSTransition>

        <div>
          <div className={style.wrapperPanorama}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={coords}
              zoom={10}
              streetView={false}
              onClick={(ev) => {
                if (!toggler) {
                  const coords = { lat: ev.latLng.lat(), lng: ev.latLng.lng() };
                  dispatch(toggleAnswerCoords(coords));
                }
              }}
            >
              <StreetViewPanorama
                position={currentImgCoords}
                visible={true}
                options={panoramaOptions}
              />
            </GoogleMap>
            <div className={style.gameButtonLike}>
              <CSSTransition in={click}
                classNames="btn-like"
                timeout={400}
                unmountOnExit
                mountOnEnter
              >
              <ButtonLike click={() => {
                handleLike()
                setClick(false)
              }}/>
              </CSSTransition>
            </div>
          </div>
        </div>
        <div className={style.modalColumn}>
          {answerCoords && (
            <div className={style.btnThisIsLocation}>
              <Button
                text="Это здесь!"
                click={() => {
                  dispatch(
                    toggleDistance(
                      geokit.distance(currentImgCoords, answerCoords)
                    )
                  );
                  setToggler((prev) => !prev);
                }}
              />
            </div>
          )}
          <Button
            text={"Сменить локацию"}
            click={() => {
              dispatch(resetGameStatus());
            }}
          />
        </div>
        <div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={coords}
            zoom={10}
            streetView={false}
            onClick={(ev) => {
              if (!toggler) {
                const coords = { lat: ev.latLng.lat(), lng: ev.latLng.lng() };
                dispatch(toggleAnswerCoords(coords));
              }
            }}
          >
            <Marker
              position={answerCoords}
              icon={
                "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
              }
            />
          </GoogleMap>
        </div>
      </div>
    </LoadScript>
  );
}
