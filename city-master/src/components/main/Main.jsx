import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Game from '../Game/Game';
import StartMap from '../StartMap/StartMap';

export const Main = () => {
  const { isGameStarted } = useSelector((state) => state.gameStatus);

  return (
    <>
      {!isGameStarted && <StartMap />}
      {isGameStarted && <Game />}
    </>
  );
};
