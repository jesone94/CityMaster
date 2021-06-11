import React from "react";
import { useSelector } from "react-redux";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import Game from "../Game/Game";
import { Paralax } from "../paralax/Paralax";
import StartMap from "../StartMap/StartMap";
import "./map.css";

export const Main = () => {
  const { isGameStarted } = useSelector((state) => state.gameStatus);

  return (
    <>
      <Paralax />
      <SwitchTransition mode="out-in">
        <CSSTransition key={isGameStarted} timeout={1000} classNames="fade-map">
          <div>
            {!isGameStarted ? (
              <div className="mapContainer">
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
