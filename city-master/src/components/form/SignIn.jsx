import React, { useEffect, useState } from "react";
import { Button } from "../button/Button";
import { useForm } from "react-hook-form";
import style from "./form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { nullErrorAndStatus } from "../../redux/userSlice";
import { Link } from "react-router-dom";
import { useLoaderContext } from "../../context/LoaderContext";
import { Loader } from "../loader/Loader";
import { fetchUserSignIn } from "../../redux/userSliceFetches/fetchUserSignIn";

import { fetchUserScrore } from "../../redux/userSliceFetches/fetchUserScore";
import { MyLogotip } from "../MyLogotip/MyLogotip";

const SignIn = () => {
  // const [active, setActive] = useState(true)
  // const closeModalHandler = (event) => {
  //   event.preventDefault();
  //   setActive(false);
  // };

  const [input, setInput] = useState("");
  const { loader } = useLoaderContext();

  const [errorMessage, setErrorMessage] = useState(null);

  const { userEmail } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.user);
  const { uid } = useSelector((state) => state.user);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

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
                <MyLogotip />

                <div className={style.modalColumn}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <label>?????????????????????? ?????????? *</label>
                      <span className={style.errors}>
                        {errors.email?.type === "required" &&
                          " ?????????????????????? ?????? ????????????????????"}
                      </span>
                      <span className={style.errors}>
                        {errors.email?.type === "pattern" &&
                          " ???? ?????????????????????????? ?????????????? ?????????????????????? ??????????"}
                      </span>
                      <input
                        placeholder="?????????????????????? ?????????? *"
                        type="text"
                        {...register("email", {
                          required: true,
                          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/gi,
                        })}
                      />
                      <div></div>
                      <label>???????????? *</label>
                      <span className={style.errors}>
                        {errors.password?.type === "required" &&
                          " ?????????????????????? ?????? ????????????????????"}
                        {errors.password?.type === "minLength" &&
                          " ???????????? ???????????? ???????? ?????????????? 6 ????????????????"}
                      </span>
                      <input
                        placeholder="???????????? *"
                        type="password"
                        {...register("password", {
                          required: true,
                          minLength: 6,
                        })}
                      />
                      <p className={style.errors}>{errorMessage}</p>
                    </div>
                    <div className={style.btnWrapFrom}>
                      <label>
                        ?????? ?????????????????..{" "}
                        <Link to="/signup">
                          <h3>????????????????????????????????????</h3>
                        </Link>
                      </label>
                      <div className={style.righted}>
                        <Button text="??????????" />
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
