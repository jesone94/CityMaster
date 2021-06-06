{loader ? (
  <Loader />
) : (
  <div className={style.container}>
    <div className={style.wrapper}>
      {file && (
        <div
          className={style.btnSmall}
          onClick={async (e) => {
            e.stopPropagation();
            setFile("");
            dispatch(fetchUserRemovePhoto());
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
                  <AddAPhotoIcon />
                </div>
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
        <h1>{displayName ? displayName : "Без имени"}&nbsp;</h1>
        <div className={style.editIcon}>
          <EditIcon
            onClick={() => {
              setDisplayNameBoolean((prev) => !prev);
              setEmailBoolean(false);
            }}
          />
        </div>
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
      </div>
      <div className={style.info}>
        <p>{userEmail}</p>
        <div className={style.editIcon}>
          <EditIcon
            onClick={() => {
              setEmailBoolean((prev) => !prev);
              setDisplayNameBoolean(false);
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
      </div>
      <div className={style.info}>
        <p>
          {" "}
          <b>UID:</b> {uid}
        </p>
      </div>
      <div className={emailBoolean ? style.show : style.hide}>
        <input
          className={style.input}
          placeholder="Подтвердите пароль"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p className={style.errors}>
          {!errorMessage
            ? "для изменения почты требуется ваш пароль"
            : errorMessage}
        </p>
      </div>

      {emailBoolean || displayNameBoolean ? (
        <div className={style.btnWrap}>
          <div className={style.righted}>
            <Button
              text="Cохранить"
              click={() => {
                if (emailBoolean) {
                  if (userEmail === email) {
                    return setErrorMessage(
                      "Вы не можете ввести такую же электронную почту"
                    );
                  }
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
                    dispatch(fetchUserDisplayName(displayNameInput));
                  } catch (e) {
                    console.log(e);
                  }
                  setDisplayNameBoolean(false);
                }
              }}
            ></Button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  </div>
)}
