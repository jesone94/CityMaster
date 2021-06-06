import React, { useState } from "react";

import { Link, NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import style from "./navbar.module.css";
import firebase from "../../firebase/firebase";
import { removeUser } from "../../redux/userSlice";
import "./logout.css";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Button } from "../button/Button";

export default function ScrollableTabsButtonPrevent() {
  const [toggler, setToggler] = useState(false);
  const dispatch = useDispatch();

  const { userEmail } = useSelector((state) => state.user);

  return (
    <>
      <ul>
        <li>
          <NavLink to="/">На главную</NavLink>
        </li>
        {userEmail && (
          <li>
            <NavLink to="/private-office">Личный кабинет</NavLink>
          </li>
        )}
        {/* {!userEmail && <li><Link to="/signin">Войти</Link ></li>}
        {!userEmail && <li><Link to="/signup">Зарегистрироваться</Link ></li>} */}

        <li className={style.righted}>
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
        </li>
      </ul>
    </>
  );
}
