import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../../firebase/firebase";
import { addUrlImg } from "../database/firebaseDatabse";

export const fetchUserAddPhotoURL = createAsyncThunk("user/fetchUserAddPhotoURL", async ({uid, link}) => {
  try {
    addUrlImg(uid, link)
    await firebase.auth().currentUser.updateProfile({
      photoURL: link,
    });
    return link
  } catch (e) {
    return console.log(e);
  }
});
