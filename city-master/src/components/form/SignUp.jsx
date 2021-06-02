import firebase from '../../firebase/firebase'
import React, { useState } from 'react';
import { FormHelperText, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/userSlice';


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
  const { handleSubmit, control } = useForm();

  let history = useHistory()

  const [errorMessagePassword, setErrorMessagePassword] = useState(null)
  const [errorMessageEmail, setErrorMessageEmail] = useState(null)
  // const [errorMessageFirstName, setErrorMessageFirstName] = useState(null)
  // const [errorMessageLastName, setErrorMessageLastName] = useState(null)

  const { userEmail } = useSelector((state) => state.user);

  // const { currentUser } = useContext(AuthContext)
  const dispatch = useDispatch()

  const onSubmit = async data => {
    setErrorMessagePassword(null)
    setErrorMessageEmail(null)
    const { name, lastName, email, password } = data
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
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
    <FormHelperText id="my-helper-text">Форма регистрации</FormHelperText>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Имя"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: 'Введите ваше имя' }}
      />
      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Фамилия"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: 'Введите вашу фамилию' }}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Электронная почта"
            variant="outlined"
            value={value}
            onChange={(e) => {
              onChange(e.target.value)
            }}
            error={!!error}
            helperText={error ? error.message : errorMessageEmail}
            type="email"
          />
        )}
        rules={{ required: 'Email required' }}
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
            onChange={(e) => {
              onChange(e.target.value)
            }}
            error={!!error}
            helperText={error ? error.message : errorMessagePassword}
            type="password"
          />
        )}
        rules={{ required: 'Password required' }}
      />
      <div>
        <Button variant="contained" onClick={handleClose}>
          Отмена
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Зарегистрироваться
        </Button>
      </div>
    </form>
    </>
  );
};
export default SignUp
