import React, { useEffect, useState } from "react";
import { Button, ButtonLoader, ButtonCls } from "../button/Button";
import style from "./privateOffice.module.css";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import firebase from "../../firebase/firebase";
import "firebase/storage";

import {
  addPhotoLoading,
  addLoading,
  nullErrorAndStatus,
} from "../../redux/userSlice";
import { IconButton } from "@material-ui/core";
import { fetchUserRemovePhoto } from "../../redux/userSliceFetches/fetchUserRemovePhoto";
import { fetchUserAddPhotoURL } from "../../redux/userSliceFetches/fetchUserAddPhotoURL";

import { fetchUserEditEmail } from "../../redux/userSliceFetches/fetchUserEditEmail";
import { fetchUserDisplayName } from "../../redux/userSliceFetches/fetchUserDisplayName";
import { useLoaderContext } from "../../context/LoaderContext";
import "./gridOfiice.css";

import { fetchUserEditPassword } from "../../redux/userSliceFetches/fetchUserEditPassword";

import { MiniLoaderM } from "../button/Mini-loaderM";
import { addFileName } from "../../redux/database/firebaseDatabse";

import { Recharts } from "./Recharts";
import { Paralax } from "../paralax/Paralax";

export const PrivateOffice = () => {
  const { loader, photoLoader } = useLoaderContext();

  const { error, userEmail, displayName, uid, photoURL, score } = useSelector(
    (state) => state.user
  );
  const { editStatus } = useSelector((state) => state.user);

  const [email, setEmail] = useState(userEmail);
  const [displayNameInput, setDisplayNameInput] = useState(`${displayName}`);
  const [editPasswordBoolean, setEditPasswordBoolean] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailBoolean, setEmailBoolean] = useState(false);
  const [displayNameBoolean, setDisplayNameBoolean] = useState(false);
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(error);

  const dispatch = useDispatch();

  useEffect(() => {
    setFile(photoURL);
  }, [photoURL, userEmail]);

  useSelector((state) => state.user);

  useEffect(() => {
    editStatus && setErrorMessage("??????????????");
    setErrorMessage(error);
  }, [error, editStatus]);

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
    addFileName(uid, file.name);
    task.on(
      "state_changed",
      async (snapshot) => {},
      (error) => {
        console.log(error);
      },
      async () => {
        const link = await ref.getDownloadURL();
        dispatch(fetchUserAddPhotoURL({ uid, link }));
      }
    );
  };

  return (
    <>
      <Paralax />
      <div className="gridBody">
        <div className="gridItem gridItem1">
          <div>
            {file && (
              <div className={style.buttonCLSwrap}>
                <ButtonCls
                  text="??????????????"
                  click={async () => {
                    dispatch(nullErrorAndStatus());
                    dispatch(addPhotoLoading());
                    dispatch(fetchUserRemovePhoto({ uid }));
                  }}
                />
              </div>
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
                  <img className={style.avatar} alt="???? ??????????????" src={file} />
                )}
              </div>
            )}
          </div>
        </div>
        <div className="gridItem gridItem2">
          <div className="subGridItem">
            <h1>
              {displayName ? displayName : "?????? ??????????"}&nbsp;
              <EditIcon
                className="pointer"
                onClick={() => {
                  dispatch(nullErrorAndStatus());
                  setDisplayNameBoolean((prev) => !prev);
                  setEditPasswordBoolean(false);
                  setEmailBoolean(false);
                }}
              />
            </h1>
          </div>
          <div className="subGridItem">
            <h2>
              {userEmail}&nbsp;
              <EditIcon
                className="pointer"
                onClick={() => {
                  dispatch(nullErrorAndStatus());
                  setEmailBoolean((prev) => !prev);
                  setDisplayNameBoolean(false);
                  setEditPasswordBoolean(false);
                }}
              />
            </h2>
          </div>
          <div className="subGridItem">
            <p>
              <b>UID:</b> {uid}
            </p>
          </div>
          <div className="subGridItem">
            <div className={style.editPasswordWrap}>
              <Button
                click={() => {
                  dispatch(nullErrorAndStatus());
                  setEditPasswordBoolean((prev) => !prev);
                  setDisplayNameBoolean(false);
                  setEmailBoolean(false);
                }}
                text="???????????????? ????????????"
              ></Button>
            </div>
          </div>
        </div>
        <div className="gridItem">
          <div className="subGridItem">
            <h1>?????????????? ??????????: {score}</h1>
          </div>
          <Recharts />
        </div>
        <div className="gridItem">
          {displayNameBoolean && (
            <div className={style.show}>
              <span>?????????? ??????:</span>
              <input
                className={style.input}
                placeholder="???????? ??????"
                type="text"
                value={displayNameInput}
                onChange={(e) => {
                  setDisplayNameInput(e.target.value);
                }}
              />
              <p className={style.errors}>{errorMessage && errorMessage}</p>
            </div>
          )}
          {emailBoolean && (
            <div className={style.show}>
              <span>?????????? ?????????????????????? ??????????:</span>
              <input
                className={style.input}
                placeholder="?????????????????????? ??????????"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          )}
          {emailBoolean && (
            <div className={style.show}>
              <span>?????? ?????????????????? ?????????????????? ?????? ????????????:</span>
              <input
                className={style.input}
                placeholder="?????????????????????? ????????????"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <p className={style.errors}>{errorMessage && errorMessage}</p>
            </div>
          )}
          {editPasswordBoolean && (
            <div className={style.show}>
              <span>?????? ?????????? ????????????:</span>
              <input
                className={style.input}
                placeholder="?????? ?????????? ????????????"
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </div>
          )}

          {editPasswordBoolean && (
            <div className={style.show}>
              <span>?????? ?????????????????? ?????????????????? ?????? ?????????????? ????????????:</span>
              <input
                className={style.input}
                placeholder="?????????????????????? ????????????"
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                }}
              />
              <p className={style.errors}>{errorMessage && errorMessage}</p>
            </div>
          )}
          {emailBoolean && (
            <div className={style.btnWrap}>
              <div className={style.righted}>
                {!loader ? (
                  <>
                    <Button
                      text="C????????????????"
                      click={() => {
                        if (emailBoolean) {
                          if (userEmail === email) {
                            return setErrorMessage(
                              "???? ???? ???????????? ???????????? ?????????? ???? ?????????????????????? ??????????"
                            );
                          }
                          if (password === "") {
                            return setErrorMessage("???????? ???? ?????????? ???????? ????????????");
                          }
                          if (
                            !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
                              email
                            )
                          ) {
                            return setErrorMessage(
                              "???? ?????????????????????????? ?????????????? ?????????????????????? ??????????"
                            );
                          }
                          try {
                            dispatch(addLoading());
                            dispatch(
                              fetchUserEditEmail({ userEmail, password, email })
                            );
                            setErrorMessage(null);
                          } catch (e) {
                            setEmailBoolean(true);
                          }
                          setPassword("");
                        }
                      }}
                    />
                    <ButtonCls
                      text="??????????????"
                      click={() => setEmailBoolean(false)}
                    />
                  </>
                ) : (
                  <ButtonLoader />
                )}
              </div>
            </div>
          )}
          {displayNameBoolean && (
            <div className={style.btnWrap}>
              <div className={style.righted}>
                {!loader ? (
                  <>
                    {" "}
                    <Button
                      text="C????????????????"
                      click={() => {
                        if (!displayNameInput) {
                          return setErrorMessage("???? ???????????????? ???????? ????????????");
                        }
                        if (displayNameInput === displayName) {
                          return setErrorMessage("???? ???? ???????????? ??????????????????");
                        }
                        try {
                          dispatch(addLoading());
                          dispatch(
                            fetchUserDisplayName({ uid, displayNameInput })
                          );
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                    />
                    <ButtonCls
                      text="??????????????"
                      click={() => setDisplayNameBoolean(false)}
                    />
                  </>
                ) : (
                  <ButtonLoader />
                )}
              </div>
            </div>
          )}
          {editPasswordBoolean && (
            <div className={style.btnWrap}>
              <div className={style.righted}>
                {!loader ? (
                  <>
                    {" "}
                    <Button
                      text="C????????????????"
                      click={() => {
                        if (password === newPassword) {
                          return setErrorMessage("???????????? ???? ?????????? ??????????????????");
                        }
                        try {
                          dispatch(addLoading());
                          dispatch(
                            fetchUserEditPassword({
                              userEmail,
                              passwordInput,
                              newPassword,
                            })
                          );
                          setErrorMessage(null);
                          // errorMessage ? setEditPasswordBoolean(true) : setEditPasswordBoolean(false)
                          // !errorMessage && setEditPasswordBoolean(false);
                        } catch (e) {
                          setEditPasswordBoolean(true);
                        }
                      }}
                    />
                    <ButtonCls
                      text="??????????????"
                      click={() => setEditPasswordBoolean(false)}
                    />
                  </>
                ) : (
                  <ButtonLoader />
                )}
              </div>
            </div>
          )}
        </div>
        <div className="gridItem"></div>
      </div>
    </>
  );
};
