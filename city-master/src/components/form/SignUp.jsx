import firebase from '../../firebase/firebase'
import React, { useState } from 'react';
import { FormHelperText, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Button } from '../button/Button'
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/userSlice';
import style from './form.module.css'
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const SignUp = ({ handleClose }) => {
  const classes = useStyles();
  const { handleSubmit, register } = useForm();

  let history = useHistory()

  const [errorMessagePassword, setErrorMessagePassword] = useState(null)
  const [errorMessageEmail, setErrorMessageEmail] = useState(null)
  const [errorMessageFirstName, setErrorMessageFirstName] = useState(null)
  const [errorMessageLastName, setErrorMessageLastName] = useState(null)

  const { userEmail } = useSelector((state) => state.user);

  // const { currentUser } = useContext(AuthContext)
  const dispatch = useDispatch()

  const onSubmit = async data => {
    setErrorMessagePassword(null)
    setErrorMessageEmail(null)
    setErrorMessageFirstName(null)
    setErrorMessageLastName(null)
    
    const { name, lastName, email, password } = data
    if (!name) {
      return setErrorMessageFirstName('Поле не может быть пустым')
    }
    if (!lastName) {
      return setErrorMessageLastName('Поле не может быть пустым')
    }
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      await firebase.auth().currentUser.updateProfile({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        displayName: `${name} ${lastName}`
      })
      await firebase.auth().onAuthStateChanged(firebaseUser => {
        dispatch(addUser({
          email: firebaseUser.email,
          displayName: firebaseUser.displayName
        }))
      })
      
      history.push('/')
    } catch(error) {
      console.log(error)
      error.code === "auth/weak-password" && setErrorMessagePassword('Установите минимальную длину пароля не менее 6 символов');
      error.code === "auth/email-already-in-use" && setErrorMessageEmail('Пользователь с таким электронным адресом уже существует')
      // onFinishFailed(error)
    }
  };

  return (
    <>
    <div className={style.containerForm}>
    <div
        onClick={() => {}}
        className={style.modalWrap}
      >
        <div className={style.modalColumn} onClick={(e) => e.stopPropagation()}>
          <div className={style.modalContent}>
            <div className={style.modalColumn}>
              <form onSubmit={handleSubmit(onSubmit)}>
              <div>
              <label>Имя</label>
              <input placeholder="Имя" type="text" {...register('name')}/>
              <span className={style.errors}>{errorMessageFirstName}</span>
              <div></div>
              <label>Фамилия</label>
              <input placeholder="Фамилия" type="text" {...register('lastName')}/>
              <span className={style.errors}>{errorMessageLastName}</span>
              <div></div>
              <label>Электронная почта</label>
              <input placeholder="Электронная почта" type="text" {...register('email')}/>
              <span className={style.errors}>{errorMessageEmail}</span>
              <div></div>
              <label>Пароль</label>
              <input placeholder="Пароль" type="password" {...register('password')}/>
              <span className={style.errors}>{errorMessagePassword}</span>
              </div>
              <div className={style.btnWrapFrom}>
              <label>есть аккаунт?.. <Link to="/signin">Войти</Link></label>
                <div className={style.righted}>
                  <Button text='Регистрация' />
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default SignUp
