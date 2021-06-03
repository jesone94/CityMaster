import firebase from '../../firebase/firebase'
import React, { useState } from 'react';
import { FormHelperText, Grid, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Button } from '../button/Button'
import { useForm, Controller } from 'react-hook-form';
import style from './form.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/userSlice';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';



const SignIn = () => {
  // const [active, setActive] = useState(true)
  // const closeModalHandler = (event) => {
  //   event.preventDefault();
  //   setActive(false);
  // };
  const [input, setInput] = useState('')
  console.log(input)

  const [errorMessagePassword, setErrorMessagePassword] = useState(null)
  const [errorMessageEmail, setErrorMessageEmail] = useState(null)

  const { handleSubmit, register } = useForm();

  let history = useHistory()

  const { userEmail } = useSelector((state) => state.user);
  
  const dispatch = useDispatch()

  const onSubmit = async data => {
    const { email, password } = data
    console.log(data)
    setErrorMessagePassword(null)
    setErrorMessageEmail(null)
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      await firebase.auth().onAuthStateChanged(firebaseUser => {
        dispatch(addUser({
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          uid: firebaseUser.uid,
          photoURL: firebaseUser.photoURL,
        }))
      })
      history.push('/')
    } catch(error) {
      console.log(error)
      error.code === "auth/wrong-password" && setErrorMessagePassword('Неверный пароль');
      error.code === "auth/user-not-found" && setErrorMessageEmail('Пользователя с таким электронным адресом не существует')
      error.code === "auth/too-many-requests" && setErrorMessagePassword('слишком много запросов')
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
              <label>Электронная почта</label>
              <input placeholder="Электронная почта" type="text" {...register('email')}/>
              <span className={style.errors}>{errorMessageEmail}</span>
              <div></div>
              <label>Пароль</label>
              <input placeholder="Пароль" type="password" {...register('password')}/>
              <span className={style.errors}>{errorMessagePassword}</span>
              </div>
              <div className={style.btnWrapFrom}>
              <label>нет аккаунта?.. <Link to="/signup">Зарегистрироваться</Link></label>
                <div className={style.righted}>
                  <Button  text='Войти' />
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
export default SignIn
