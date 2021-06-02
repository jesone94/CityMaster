import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Button, CircularProgress, IconButton, Input } from "@material-ui/core";
import style from "./privateOffice.module.css";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import SaveIcon from "@material-ui/icons/Save";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import CancelIcon from "@material-ui/icons/Cancel";
import firebase from '../../firebase/firebase';
import 'firebase/storage'
import * as functions from "firebase/functions";
import { addPhoto, removePhoto } from '../../redux/userSlice'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}));

export const PrivateOffice = () => {
  const classes = useStyles();
  const { displayName } = useSelector((state) => state.user);
  const { userEmail } = useSelector((state) => state.user);

  const [file, setFile] = useState(null);

  const dispatch = useDispatch()

  const { uid } = useSelector((state) => state.user);
  const { photoURL } = useSelector((state) => state.user);

  useEffect(() => {
    setFile(photoURL)
  }, [photoURL])

  const user = useSelector((state) => state.user);
  console.log(user)
  const reader = new FileReader();

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
    upload(file)
    console.log(file);
  };
  const upload = async (file) => {
    const ref = firebase.storage().ref(`avatars/${uid}/${file.name}`);
    const task = ref.put(file);
    task.on('state_changed', async (snapshot) => {
    }, (error) => {
      console.log(error);
    }, async () => {
      const link = await ref.getDownloadURL();
      console.log(link)
      await firebase.auth().currentUser.updateProfile({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        photoURL: link
      })
      dispatch(addPhoto(link))
    });
  };
  // const Input = styled('input')({
  //   display: 'none',
  // });

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              {!file ? (
                <form onSubmit={(e) => handleSubmit(e)}>
                  <label htmlFor="contained-button-file">
                    <Input
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
              ) : (
                <>
                  <div className={style.flexColumn}>
                    <Avatar className={classes.large}>
                      <img
                        className={classes.img}
                        alt="не найдено"
                        src={file}
                      />
                    </Avatar>
                    <div className={style.btnPos}>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={async (e) => {
                          e.stopPropagation()
                          setFile('')
                          await firebase.auth().currentUser.updateProfile({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                            photoURL: ''
                          })
                          dispatch(removePhoto())
                          // return firebase.storage().bucket().deleteFiles({
                          //   prefix: `avatars/${uid}`
                          // });
                        }}
                      >
                        <CancelIcon />
                      </IconButton>
                    </div>
                    {/* <div className={style.btnPosSave}>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <SaveIcon />
                    </IconButton>
                    </div> */}
                  </div>
                </>
              )}
            </ButtonBase>
          </Grid>

          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {displayName}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {userEmail}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {uid}
                </Typography>
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained" color="primary">
                  Редактировать
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">кхм</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
