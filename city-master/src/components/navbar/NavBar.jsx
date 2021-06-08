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
import { Button, ButtonLike } from "../button/Button";
import logo from "../../images/logo.png";

export default function ScrollableTabsButtonPrevent() {
  const [toggler, setToggler] = useState(false);
  const dispatch = useDispatch();
  const { userEmail } = useSelector((state) => state.user);

  const [togglerMenu, setTogglerMenu] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    windowSize > 1000 && setTogglerMenu(true);
    windowSize <= 1000 && setTogglerMenu(false);
  }, [setWindowSize, windowSize]);

  const handleWindowResize = useCallback((event) => {
    setWindowSize(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);

  return (
    <>
      {!userEmail ? (
        <ul>
          <li>
            <Link>CityKong</Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <div className={style.itemWrapper}>
              <ButtonClose
                click={() => setTogglerMenu((prev) => !prev)}
              ></ButtonClose>
            </div>
          </li>
          <CSSTransition
            in={togglerMenu}
            timeout={400}
            classNames="navBar"
            mountOnEnter
            unmountOnExit
          >
            <li>
              <NavLink to="/">На главную</NavLink>
            </li>
          </CSSTransition>
          {userEmail && (
            <CSSTransition
              in={togglerMenu}
              timeout={400}
              classNames="navBar"
              mountOnEnter
              unmountOnExit
            >
              <li>
                <NavLink to="/private-office">Личный кабинет</NavLink>
              </li>
            </CSSTransition>
          )}

          {userEmail && (
            <CSSTransition
              in={togglerMenu}
              timeout={400}
              classNames="navBar"
              mountOnEnter
              unmountOnExit
            >
              <li>
                <NavLink to="/favorites">Избранное</NavLink>
              </li>
            </CSSTransition>
          )}

          {userEmail && (
            <CSSTransition
              in={togglerMenu}
              timeout={400}
              classNames="navBar"
              mountOnEnter
              unmountOnExit
            >
              <li>
                <NavLink to="/stats">Рейтинги</NavLink>
              </li>
            </CSSTransition>
          )}

          {/* {!userEmail && <li><Link to="/signin">Войти</Link ></li>}
        {!userEmail && <li><Link to="/signup">Зарегистрироваться</Link ></li>} */}
          {/* </CSSTransition>
        </TransitionGroup > */}
          <CSSTransition
            in={togglerMenu}
            timeout={400}
            classNames="navBar"
            mountOnEnter
            unmountOnExit
          >
            <li className={style.righted}>
              <SwitchTransition mode="out-in">
                <CSSTransition
                  key={toggler}
                  timeout={400}
                  classNames="logout-btn"
                >
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
            </li>
          </CSSTransition>
        </ul>
      )}
      <div className={style.logoWrapper}>
        <img alt="не найдено" src={logo} />
      </div>
    </>
  );
}
