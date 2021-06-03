import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link, NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import style from './navbar.module.css'
import firebase from '../../firebase/firebase'
import { removeUser } from '../../redux/userSlice';


export default function ScrollableTabsButtonPrevent() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { userEmail } = useSelector((state) => state.user);

  return (
    <>
      <ul>
        <li><NavLink to="/">На главную</NavLink ></li>
        {userEmail && <li><NavLink to="/private-office">Личный кабинет</NavLink ></li>}
        {/* {!userEmail && <li><Link to="/signin">Войти</Link ></li>}
        {!userEmail && <li><Link to="/signup">Зарегистрироваться</Link ></li>} */}
        <li className={style.righted}><Link onClick={async () => {
          await firebase.auth().signOut()
          dispatch(removeUser())
        }} >Выйти</Link ></li>
      </ul>
    </>
  );
}
