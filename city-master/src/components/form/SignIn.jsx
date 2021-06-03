import firebase from "../../firebase/firebase";
import React, { useEffect, useState } from "react";
import { FormHelperText, Grid, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Button } from "../button/Button";
import { useForm, Controller } from "react-hook-form";
import style from "./form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/userSlice";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useLoaderContext } from "../../context/LoaderContext";
import { Loader } from "../loader/Loader";
import { fetchUserSignIn } from "../../redux/userSliceFetches/fetchUserSignIn";

const SignIn = () => {
  // const [active, setActive] = useState(true)
  // const closeModalHandler = (event) => {
  //   event.preventDefault();
  //   setActive(false);
  // };
  const [input, setInput] = useState("");
  const { loader } = useLoaderContext();

  const [errorMessagePassword, setErrorMessagePassword] = useState(null);

  const { handleSubmit, register } = useForm();

  let history = useHistory();

  const { userEmail } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.user);

  useEffect(() => {
    setErrorMessagePassword(error)
  }, [error])

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(fetchUserSignIn(data))
    setErrorMessagePassword(null);
    history.push('/')
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className={style.containerForm}>
          <div onClick={() => {}} className={style.modalWrap}>
            <div
              className={style.modalColumn}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={style.modalContent}>
                <div className={style.modalColumn}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <label>Электронная почта</label>
                      <input
                        placeholder="Электронная почта"
                        type="text"
                        {...register("email")}
                      />
                      <div></div>
                      <label>Пароль</label>
                      <input
                        placeholder="Пароль"
                        type="password"
                        {...register("password")}
                      />
                      <span className={style.errors}>
                        {errorMessagePassword}
                      </span>
                    </div>
                    <div className={style.btnWrapFrom}>
                      <label>
                        нет аккаунта?..{" "}
                        <Link to="/signup">Зарегистрироваться</Link>
                      </label>
                      <div className={style.righted}>
                        <Button text="Войти" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SignIn;
