import firebase from '../../firebase/firebase'
import React, { useEffect, useState } from 'react';
import { FormHelperText, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Button } from '../button/Button'
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { addUser, nullError } from '../../redux/userSlice';
import style from './form.module.css'
import { Link } from 'react-router-dom';
import { fetchUserSignUp } from '../../redux/userSliceFetches/fetchUserSignUp';
import { useLoaderContext } from '../../context/LoaderContext';
import { Loader } from '../loader/Loader';


const SignUp = () => {
  const { loader } = useLoaderContext();
  const { handleSubmit, register } = useForm();

  let history = useHistory()

  const [errorMessage, setErrorMessage] = useState(null)


  const { userEmail } = useSelector((state) => state.user);

  const { error } = useSelector((state) => state.user);

  useEffect(() => {
    setErrorMessage(error)
  }, [error])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(nullError())
  }, [dispatch])
  // const { currentUser } = useContext(AuthContext)
  

  const onSubmit = async (data) => {
    const { name, email, password } = data
    dispatch(fetchUserSignUp(data))
    // history.push('/')
  };

  return (
    <>
    {loader ? <Loader /> : <div className={style.containerForm}>
    <div
        onClick={() => {}}
        className={style.modalWrap}
      >
        <div className={style.modalColumn} onClick={(e) => e.stopPropagation()}>
          <div className={style.modalContent}>
            <div className={style.modalColumn}>
              <form onSubmit={ handleSubmit(onSubmit)}>
              <div>
              <label>Имя</label>
              <input placeholder="Имя" type="text" {...register('name')}/>
           
              <div></div>
              <label>Электронная почта *</label>
              <input placeholder="Электронная почта" type="text" {...register('email')}/>
       
              <div></div>
              <label>Пароль *</label>
              <input placeholder="Пароль" type="password" {...register('password')}/>
              <span className={style.errors}>{errorMessage}</span>
              </div>
              <div className={style.btnWrapFrom}>
              <label>есть аккаунт?.. <Link to="/signin"><h3>Войти в профиль</h3></Link></label>
                <div className={style.righted}>
                  <Button text='Регистрация' />
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>}
    
    </>
  );
};
export default SignUp
