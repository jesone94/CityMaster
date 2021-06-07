import React, { useEffect, useState } from "react";
import { Button, ButtonLoader } from "../button/Button";
import style from "./privateOffice.module.css";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import firebase from "../../firebase/firebase";
import "firebase/storage";

import { nullError, addPhotoLoading, addLoading } from "../../redux/userSlice";
import { IconButton } from "@material-ui/core";
import { fetchUserRemovePhoto } from "../../redux/userSliceFetches/fetchUserRemovePhoto";
import { fetchUserAddPhotoURL } from "../../redux/userSliceFetches/fetchUserAddPhotoURL";

import { fetchUserEditEmail } from "../../redux/userSliceFetches/fetchUserEditEmail";
import { fetchUserDisplayName } from "../../redux/userSliceFetches/fetchUserDisplayName";
import { useLoaderContext } from "../../context/LoaderContext";
import "./gridOfiice.css";
import { Link } from "react-router-dom";
import { fetchUserEditPassword } from "../../redux/userSliceFetches/fetchUserEditPassword";

import { MiniLoaderM } from "../button/Mini-loaderM";
import { addFileName, addScore } from "../../redux/database/firebaseDatabse";
import { addLoader } from "../../redux/loaderSlice";

export const PrivateOffice = () => {
  const { loader, photoLoader } = useLoaderContext();

  const { displayName } = useSelector((state) => state.user);
  const { userEmail } = useSelector((state) => state.user);
  const { uid } = useSelector((state) => state.user);
  const { photoURL } = useSelector((state) => state.user);

  const [email, setEmail] = useState(userEmail);
  const [displayNameInput, setDisplayNameInput] = useState(`${displayName}`);
  const [editPasswordBoolean, setEditPasswordBoolean] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailBoolean, setEmailBoolean] = useState(false);
  const [displayNameBoolean, setDisplayNameBoolean] = useState(false);
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setFile(photoURL);
  }, [photoURL, userEmail]);

  useSelector((state) => state.user);
  const { error } = useSelector((state) => state.user);

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  useEffect(() => {
    dispatch(nullError());
  }, [dispatch]);

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
    dispatch(addPhotoLoading());
  };
  const upload = async (file) => {
    const ref = firebase.storage().ref(`avatars/${uid}/${file.name}`);
    const task = ref.put(file);
    addFileName(uid, file.name)
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
      {/* {loader ? (
        <Loader />
      ) : ( */}
      <div className="gridBody" >
        <div className="gridItem gridItem1">
          <div>
            {file && (
              <div
                className={style.btnSmall}
                onClick={async (e) => {
                  e.stopPropagation();
                  dispatch(addPhotoLoading());
                  dispatch(fetchUserRemovePhoto({uid}));
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
                      <div className={style.photoIcon}>
                        <AddAPhotoIcon style={{ color: "#fff" }} />
                      </div>
                    </IconButton>
                  </label>
                </form>
              </div>
            ) : (
              <div>
                {photoLoader ? (
                  <div className={style.uloadDiv}>
                    <MiniLoaderM />
                  </div>
                ) : (
                  <img className={style.avatar} alt="не найдено" src={file} />
                )}
              </div>
            )}
          </div>
        </div>
        <div className="gridItem gridItem2">
          <div className="subGridItem">
            <h1>
              {displayName ? displayName : "Без имени"}&nbsp;
              <EditIcon
                className="pointer"
                onClick={() => {
                  setDisplayNameBoolean((prev) => !prev);
                  setEditPasswordBoolean(false);
                  setEmailBoolean(false);
                }}
              />
            </h1>
          </div>
          <div className="subGridItem">
            <p>
              {userEmail}&nbsp;
              <EditIcon
                className="pointer"
                onClick={() => {
                  setEmailBoolean((prev) => !prev);
                  setDisplayNameBoolean(false);
                  setEditPasswordBoolean(false);
                }}
              />
            </p>
          </div>
          <div className="subGridItem">
            <p>
              <b>UID:</b> {uid}
            </p>
          </div>
          <div className="subGridItem">
            <Link
              onClick={() => {
                setEditPasswordBoolean((prev) => !prev);
                setDisplayNameBoolean(false);
                setEmailBoolean(false);
              }}
            >
              Изменить пароль
            </Link>
          </div>
        </div>
        <div className="gridItem">
          <h1>CONTENT</h1>
        </div>
        <div className="gridItem">
          <div className={displayNameBoolean ? style.show : style.hide}>
            <input
              className={style.input}
              placeholder="Ваше имя"
              type="text"
              value={displayNameInput}
              onChange={(e) => {
                setDisplayNameInput(e.target.value);
              }}
            />
          </div>
          <div className={editPasswordBoolean ? style.show : style.hide}>
            <input
              className={style.input}
              placeholder="Ваш новый пароль"
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </div>
          <div className={emailBoolean ? style.show : style.hide}>
            <input
              className={style.input}
              placeholder="Электронная почта"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div
            className={
              emailBoolean || editPasswordBoolean ? style.show : style.hide
            }
          >
            <input
              className={style.input}
              placeholder={
                emailBoolean
                  ? "Подтвердите пароль"
                  : "Введите ваш старый пароль"
              }
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <p className={style.errors}>
              {!errorMessage
                ? emailBoolean
                  ? "для изменения почты требуется ваш пароль"
                  : "для потдверждения требуется старый пароль"
                : errorMessage}
            </p>
          </div>
          {emailBoolean || displayNameBoolean || editPasswordBoolean ? (
            <div className={style.btnWrap}>
              <div className={style.righted}>
                {!loader ? (
                  <Button
                    text="Cохранить"
                    click={() => {
                      if (emailBoolean) {
                        if (userEmail === email) {
                          return setErrorMessage(
                            "Вы не можете ввести такую же электронную почту"
                          );
                        }
                        if (password === "") {
                          return setErrorMessage("Поле не может быть пустым");
                        }
                        dispatch(addLoading())
                        dispatch(
                          fetchUserEditEmail({ userEmail, password, email })
                        );
                        !errorMessage && setEmailBoolean(false);

                        setPassword("");
                      } else if (displayNameBoolean) {
                        try {
                          if (!displayNameInput) {
                            return setErrorMessage("Вы оставили поле пустым");
                          }
                          if (displayNameInput === displayName) {
                            return setErrorMessage("Вы не внесли изменений");
                          }
                          dispatch(addLoading())
                          dispatch(fetchUserDisplayName({uid, displayNameInput}));
                        } catch (e) {
                          console.log(e);
                        }
                        setDisplayNameBoolean(false);
                      } else if (setEditPasswordBoolean) {
                        if (password === newPassword) {
                          return setErrorMessage("Пароли не могут совпадать");
                        }
                        dispatch(addLoading())
                        dispatch(
                          fetchUserEditPassword({
                            userEmail,
                            password,
                            newPassword,
                          })
                        );
                        !errorMessage && setEditPasswordBoolean(false)
                      }
                    }}
                  />
                ) : (
                  <ButtonLoader />
                )}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="gridItem">
          <h1>CONTENT</h1>
        </div>
      </div>
      {/* )} */}
    </>
  );
};
