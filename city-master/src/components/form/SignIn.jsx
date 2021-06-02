import firebase from '../../firebase/firebase'
import React, { useState } from 'react';
import { FormHelperText, Grid, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/userSlice';
import { useHistory } from 'react-router';
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

const SignIn = ({ handleClose }) => {
  const classes = useStyles();
  const [errorMessagePassword, setErrorMessagePassword] = useState(null)
  const [errorMessageEmail, setErrorMessageEmail] = useState(null)

  const { handleSubmit, control } = useForm();

  let history = useHistory()

  const { userEmail } = useSelector((state) => state.user);
  
  const dispatch = useDispatch()

  const onSubmit = async data => {
    const { email, password } = data
    setErrorMessagePassword(null)
    setErrorMessageEmail(null)
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      await firebase.auth().onAuthStateChanged(firebaseUser => {
        dispatch(addUser({
          email: firebaseUser.email,
          displayName: firebaseUser.displayName
        }))
      })
      history.push('/')
    } catch(error) {
      console.log(error)
      error.code === "auth/wrong-password" && setErrorMessagePassword('Неверный пароль');
      error.code === "auth/user-not-found" && setErrorMessageEmail('Пользователя с таким электронным адресом не существует')
      error.code === "auth/too-many-requests" && console.log('слишком много запросов')
      // onFinishFailed(error)
    }
  };

  return (
    <>
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
    <FormHelperText id="my-helper-text">Форма авторизации</FormHelperText>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Электронная почта"
            variant="outlined"
            value={value}
            onChange={(e) =>{
              onChange(e.target.value)
              setErrorMessageEmail(null)
            }}
            error={!!error}
            helperText={error ? error.message : errorMessageEmail}
            type="email"
          />
        )}
        rules={{ required: 'Введите вашу электронную почту' }}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Пароль"
            variant="outlined"
            value={value}
            onChange={(e) =>{
              onChange(e.target.value)
              setErrorMessagePassword(null)
            }}
            error={!!error}
            helperText={error ? error.message : errorMessagePassword}
            type="password"
          />
        )}
        rules={{ required: 'Введите пароль' }}
      />
      <div>
        <Button variant="contained" onClick={handleClose}>
          Отмена
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Войти
        </Button>
      </div>

    </form>
    </>
  );
};
export default SignIn
