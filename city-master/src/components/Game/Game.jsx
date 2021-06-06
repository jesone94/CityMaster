import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import {
  searchCoordsToggle,
  toggleAnswerCoords,
  toggleCurrentImg,
  toggleDistance,
} from '../../redux/gameStatusSlice';
import cordsRandomazer from '../StartMap/coordRamdomazer';
import { Button } from '../button/Button';
import './modalGame.css';
import style from './game.module.css';
import * as geokit from 'geokit';

export default function Game() {
  // const [answerCoords, setAnswerCoords] = useState({});
  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,

    zIndex: 1,
  };
  const containerStyle = {
    width: '600px',
    height: '300px',
  };

  const state = useSelector((state) => state.gameStatus);
  const dispatch = useDispatch();

  const { coords, searchCoords, currentImgUrl, currentImgCoords, answerDistance, answerCoords } =
    state;

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
        <CSSTransition in={toggler} timeout={700} classNames='modal' mountOnEnter unmountOnExit>
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
                <h3>Ваше расстояние от точки вопроса {String(answerDistance.toFixed(2))} км </h3>
              )}
              <hr />

              <GoogleMap mapContainerStyle={containerStyle} center={currentImgCoords} zoom={11}>
                <Marker position={currentImgCoords} key={1} />
                <Marker
                  position={answerCoords}
                  key={2}
                  icon={
                    'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
                  }
                />

                <Polyline path={[currentImgCoords, answerCoords]} options={options} />
              </GoogleMap>

              <div className={style.btnWrap}></div>
              <div className={style.righted}>
                <Button
                  text='Продолжить'
                  click={() => {
                    dispatch(searchCoordsToggle(cordsRandomazer(coords)));
                    dispatch(toggleDistance(0));
                    setToggler(false);
                    dispatch(toggleAnswerCoords({}));
                  }}
                ></Button>
              </div>
            </div>
          </div>
        </CSSTransition>
        <div>
          <img src={currentImgUrl}></img>
        </div>
        <div className={style.btnThisIsLocation}>
          <Button
            text='Это здесь!'
            click={() => {
              dispatch(toggleDistance(geokit.distance(currentImgCoords, answerCoords)));
              setToggler((prev) => !prev);
            }}
          />
        </div>
        <div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={coords}
            zoom={10}
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
                'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
              }
            />
          </GoogleMap>
        </div>
      </div>
    </LoadScript>
  );
}
