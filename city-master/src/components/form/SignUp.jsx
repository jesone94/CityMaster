import firebase from '../../firebase/firebase'
import React from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';

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

  const { userEmail } = useSelector((state) => state.user);

  // const { currentUser } = useContext(AuthContext)
  const dispatch = useDispatch()

  const onSubmit = async data => {
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
      
      // props.history.push('/')
    } catch(error) {
      // onFinishFailed(error)
    }
  };

  return (
    <>
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Имя"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: 'First name required' }}
      />
      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Фамилия"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: 'Last name required' }}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Электронная почта"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
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
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
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
