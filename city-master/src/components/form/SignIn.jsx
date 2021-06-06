import React, { useEffect, useState } from "react";
import { Button } from "../button/Button";
import { useForm } from "react-hook-form";
import style from "./form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { nullError } from "../../redux/userSlice";
import { Link } from "react-router-dom";
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

  const [errorMessage, setErrorMessage] = useState(null);

  const { handleSubmit, register } = useForm();

  const { userEmail } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.user);

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(nullError());
  }, [dispatch]);

  const onSubmit = async (data) => {
    dispatch(fetchUserSignIn(data));
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
                <div className={style.modalColumn}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <label>Электронная почта *</label>
                      <input
                        placeholder="Электронная почта *"
                        type="text"
                        {...register("email")}
                      />
                      <div></div>
                      <label>Пароль *</label>
                      <input
                        placeholder="Пароль *"
                        type="password"
                        {...register("password")}
                      />
                      <p className={style.errors}>{errorMessage}</p>
                    </div>
                    <div className={style.btnWrapFrom}>
                      <label>
                        нет аккаунта?..{" "}
                        <Link to="/signup">
                          <h3>Зарегистрироваться</h3>
                        </Link>
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
