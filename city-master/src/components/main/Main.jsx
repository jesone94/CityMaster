import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { allUsers } from '../../redux/database/firebaseDatabse';
import Game from '../Game/Game';
import StartMap from '../StartMap/StartMap';
import './map.css';

export const Main = () => {
  const { isGameStarted } = useSelector((state) => state.gameStatus);
  useEffect(async () => {
    const all = await allUsers();
    const arr = Object.values(all);

    console.log(arr.sort((a, b) => b.score - a.score));
  });

  return (
    <>
      {/* {!isGameStarted && <StartMap />}
      {isGameStarted && <Game />} */}

      <SwitchTransition mode='out-in'>
        <CSSTransition key={isGameStarted} timeout={1000} classNames='fade-map'>
          <div>
            {!isGameStarted ? (
              <div className='mapContainer'>
                <StartMap />
              </div>
            ) : (
              <Game />
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};
