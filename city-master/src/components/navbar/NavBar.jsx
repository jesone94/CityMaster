import React, { useCallback, useEffect, useState } from "react";
import "./navBar.css";
import { Link, NavLink } from "react-router-dom";
import { ButtonClose } from "../buttonClose/buttonClose";
import { useDispatch, useSelector } from "react-redux";
import style from "./navbar.module.css";
import firebase from "../../firebase/firebase";
import { removeUser } from "../../redux/userSlice";
import "./logout.css";
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from "react-transition-group";
import { Button } from "../button/Button";

export default function ScrollableTabsButtonPrevent() {
  const [toggler, setToggler] = useState(false);
  const dispatch = useDispatch();
  const { userEmail } = useSelector((state) => state.user);
  
  const [togglerMenu, setTogglerMenu] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    windowSize > 1000 && setTogglerMenu(true)
  }, [setWindowSize, windowSize]);

  const handleWindowResize = useCallback(event => {
    setWindowSize(window.innerWidth);
  }, []); 


useEffect(() => {
  window.addEventListener('resize', handleWindowResize);
}, [handleWindowResize]);

  return (
    <>
      <ul>
        <li>
          <div className={style.itemWrapper}>
            <ButtonClose
              booleanToggle={!togglerMenu}
              click={() => setTogglerMenu((prev) => !prev)}
            ></ButtonClose>
          </div>
        </li>
        <li>
          <CSSTransition
            in={togglerMenu}
            timeout={400}
            classNames="navBar"
            mountOnEnter
            unmountOnExit
          >
            <NavLink to="/">На главную</NavLink>
          </CSSTransition>
        </li>
        {userEmail && (
          <li>
            <CSSTransition
              in={togglerMenu}
              timeout={400}
              classNames="navBar"
              mountOnEnter
              unmountOnExit
            >
              <NavLink to="/private-office">Личный кабинет</NavLink>
            </CSSTransition>
          </li>
        )}
        {/* {!userEmail && <li><Link to="/signin">Войти</Link ></li>}
        {!userEmail && <li><Link to="/signup">Зарегистрироваться</Link ></li>} */}
        {/* </CSSTransition>
        </TransitionGroup > */}
        
        <li className={style.righted}>
        <CSSTransition
              in={togglerMenu}
              timeout={400}
              classNames="navBar"
              mountOnEnter
              unmountOnExit
            >
          <SwitchTransition mode="out-in">
            <CSSTransition key={toggler} timeout={400} classNames="logout-btn">
              {!toggler ? (
                <Link
                  onClick={() => {
                    setToggler((prev) => !prev);
                  }}
                >
                  Выйти
                </Link>
              ) : (
                <div className={style.modalContent}>
                  <div
                    className={style.btnSmall}
                    onClick={(e) => {
                      setToggler((prev) => !prev);
                      e.stopPropagation();
                    }}
                  ></div>
                  <div className={style.modalRow}>
                    <h3>Вы точно хотите выйти?&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                    <div className={style.btnWrap}></div>
                    <Button
                      text="Да"
                      click={async () => {
                        setToggler(false);
                        dispatch(removeUser());
                        await firebase.auth().signOut();
                      }}
                    ></Button>
                  </div>
                </div>
              )}
            </CSSTransition>
          </SwitchTransition>
          </CSSTransition>
        </li>
      </ul>
    </>
  );
}
