import React, { useEffect, useState } from "react";
import { Button } from '../button/Button'
import style from "./privateOffice.module.css";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

import { useDispatch, useSelector } from "react-redux";
import EditIcon from '@material-ui/icons/Edit';
import firebase from "../../firebase/firebase";
import "firebase/storage";

import { addLoading } from "../../redux/userSlice";
import { IconButton } from "@material-ui/core";
import { fetchUserRemovePhoto } from "../../redux/userSliceFetches/fetchUserRemovePhoto";
import { fetchUserAddPhotoURL } from "../../redux/userSliceFetches/fetchUserAddPhotoURL";
import { Loader } from "../loader/Loader";
import { fetchUserEditEmail } from "../../redux/userSliceFetches/fetchUserEditEmail";
import { fetchUserDisplayName } from "../../redux/userSliceFetches/fetchUserDisplayName";
import { useLoaderContext } from "../../context/LoaderContext";
import { addLoader } from "../../redux/loaderSlice";


export const PrivateOffice = () => {
  const { loader } = useLoaderContext();
  console.log(loader)
  const { displayName } = useSelector((state) => state.user);
  const { userEmail } = useSelector((state) => state.user);
  const [email, setEmail] = useState(`${userEmail}`)
  const [displayNameInput, setDisplayNameInput] = useState(`${displayName}`)
  const [password, setPassword] = useState('')
  const [emailBoolean, setEmailBoolean] = useState(false)
  const [displayNameBoolean, setDisplayNameBoolean] = useState(false)
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)

  const dispatch = useDispatch();

  const { uid } = useSelector((state) => state.user);
  const { photoURL } = useSelector((state) => state.user);

  useEffect(() => {
    setFile(photoURL);
  }, [photoURL, userEmail]);

  useSelector((state) => state.user);


  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(reader.result);
    };
    reader.readAsDataURL(file);
    upload(file);
    dispatch(addLoading())
  };
  const upload = async (file) => {
    const ref = firebase.storage().ref(`avatars/${uid}/${file.name}`);
    const task = ref.put(file);
    task.on(
      "state_changed",
      async (snapshot) => {},
      (error) => {
        console.log(error);
      },
      async () => {
        const link = await ref.getDownloadURL();
        // console.log(link);
        // await firebase.auth().currentUser.updateProfile({
        //   photoURL: link,
        // });
        dispatch(fetchUserAddPhotoURL(link));
      }
    );
  };

  return (
    <>
    {loader && <Loader />} <div className={style.container}>
        <div className={style.wrapper}>
          {file && (
            <div
              className={style.btnSmall}
              onClick={async (e) => {
                e.stopPropagation();
                setFile("");
                dispatch(fetchUserRemovePhoto())
              }}
            ></div>
          )}
          {!file ? (
            <div className={style.uloadDiv}>
              <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="contained-button-file">
                  <input
                    className={style.hide}
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => handleImageChange(e)}
                    
                  />
                  <IconButton
                    variant="contained"
                    component="span"
                    type="submit"
                  >
                    <AddAPhotoIcon />
                  </IconButton>
                </label>
              </form>
              
            </div>
          ) : (
            <img className={style.avatar} alt="не найдено" src={file} />
          )}
          
        </div>
        <div className={style.content}>
          <div className={style.info}>
            <h1>{displayName}&nbsp;</h1><div className={style.editIcon}><EditIcon onClick={() => {
              setDisplayNameBoolean((prev) => !prev)
              setEmailBoolean(false)
            }}/></div>
            <div className={displayNameBoolean ? style.show : style.hide}>
            <input className={style.input} placeholder="Электронная почта" type="text" value={displayNameInput} onChange={(e) => {
              setDisplayNameInput(e.target.value)
            }}/>
            </div>
          </div>
          <div className={style.info}>
            <p>{userEmail}</p><div className={style.editIcon}><EditIcon onClick={() => {
              setEmailBoolean((prev) => !prev)
              setDisplayNameBoolean(false)
            }}/></div>
            <div className={emailBoolean ? style.show : style.hide}>
            <input className={style.input} placeholder="Электронная почта" type="text" value={email} onChange={(e) => {
              setEmail(e.target.value)
            }}/>
            </div>
          </div>
          <div className={style.info}>
            <p> <b>UID:</b> {uid}</p>
          </div>
          <div className={emailBoolean ? style.show : style.hide}>
            <input className={style.input} placeholder="Подтвердите пароль" type="password" value={password} onChange={(e) => {
              setPassword(e.target.value)
            }}/>
            <span className={style.errors}>{!errorMessage && "для изменения почты требуется ваш пароль"}</span>
            </div>
          
          {emailBoolean || displayNameBoolean ? <div className={style.btnWrap}><div className={style.righted}><Button text="Cохранить" click={
            async() => {
              if (emailBoolean){
                try {
                  if (userEmail === email){
                    return setErrorMessage('Вы не можете ввести такую же электронную почту');
                  }
                  dispatch(fetchUserEditEmail(userEmail, password, email))
                  setEmailBoolean(false)
                } catch(error) {
                  console.log(error)
                  error.code === "auth/wrong-password" && setErrorMessage('Неверный пароль');
                  error.code === "auth/user-not-found" && setErrorMessage('Пользователя с таким электронным адресом не существует')
                  error.code === "auth/too-many-requests" && setErrorMessage('слишком много запросов')
                  // onFinishFailed(error)
                }
                setPassword('')
              } else if(displayNameBoolean){
                try {
                  if (!displayNameInput) {
                    return setErrorMessage('Вы оставили поле пустым')
                  }
                  if (displayNameInput === displayName) {
                    return setErrorMessage('Вы не внесли изменений')
                  }
                  dispatch(fetchUserDisplayName(displayNameInput))
                } catch (e){
                  console.log(e)
                }
                setDisplayNameBoolean(false)
              }         
            }
          }></Button></div></div>  : <div></div>}

        </div>
      </div>

    </>
  );
};
