import React, { useEffect, useState } from "react";
import { Button } from "../button/Button";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { nullErrorAndStatus } from "../../redux/userSlice";
import style from "./form.module.css";
import { Link } from "react-router-dom";
import { fetchUserSignUp } from "../../redux/userSliceFetches/fetchUserSignUp";
import { useLoaderContext } from "../../context/LoaderContext";
import { Loader } from "../loader/Loader";
import { fetchUserScrore } from "../../redux/userSliceFetches/fetchUserScore";
import { MyLogotip } from "../MyLogotip/MyLogotip";

const SignUp = () => {
  const { loader } = useLoaderContext();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState(null);

  const { userEmail, uid, error } = useSelector((state) => state.user);

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserScrore(uid));
  }, [dispatch, uid]);

  useEffect(() => {
    dispatch(nullErrorAndStatus());
  }, [dispatch]);
  // const { currentUser } = useContext(AuthContext)

  const onSubmit = async (data) => {
    // const { name, email, password } = data;
    dispatch(fetchUserSignUp(data));
    // history.push('/')
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
                <MyLogotip />
                <div className={style.modalColumn}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <label>Имя *</label>
                      <span className={style.errors}>
                        {errors.name?.type === "required" &&
                          " Обязательное для заполнения поле"}
                        {errors.name?.type === "minLength" &&
                          " Должно быть более трёх символов"}
                      </span>
                      <input
                        placeholder="Имя"
                        type="text"
                        {...register("name", { required: true, minLength: 3 })}
                      />
                      <div></div>
                      <label>Электронная почта *</label>
                      <span className={style.errors}>
                        {errors.email?.type === "required" &&
                          " Обязательно для заполнения"}
                        {errors.email?.type === "pattern" &&
                          " Не соответствует формату электронной почты"}
                      </span>
                      <input
                        placeholder="Электронная почта"
                        type="text"
                        {...register("email", {
                          required: true,
                          pattern:
                            /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/gi,
                        })}
                      />
                      <div></div>
                      <label>Пароль *</label>{" "}
                      <span className={style.errors}>
                        {errors.password?.type === "required" &&
                          " Обязательно для заполнения"}
                        {errors.password?.type === "minLength" &&
                          " Пароль должен быть длиннее 6 символов"}
                      </span>
                      <input
                        placeholder="Пароль"
                        type="password"
                        {...register("password", {
                          required: true,
                          minLength: 6,
                        })}
                      />
                      <span className={style.errors}>{errorMessage}</span>
                    </div>
                    <div className={style.btnWrapFrom}>
                      <label>
                        есть аккаунт?..{" "}
                        <Link to="/signin">
                          <h3>Войти в профиль</h3>
                        </Link>
                      </label>
                      <div className={style.righted}>
                        <Button text="Регистрация" />
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
export default SignUp;
