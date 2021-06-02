import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Button, CircularProgress, IconButton, Input } from "@material-ui/core";
import style from "./privateOffice.module.css";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import SaveIcon from "@material-ui/icons/Save";
import { useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import CancelIcon from "@material-ui/icons/Cancel";

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

  const reader = new FileReader();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
    console.log(file);
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
                        alt={file.name}
                        src={file.imagePreviewUrl}
                      />
                    </Avatar>
                    <div className={style.btnPos}>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={(e) => {
                          e.stopPropagation()
                          setFile('')
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
                  ID: {Math.random() * 10000000000000000}
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
