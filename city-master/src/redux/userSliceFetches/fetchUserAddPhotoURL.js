import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../../firebase/firebase";

export const fetchUserAddPhotoURL = createAsyncThunk("user/fetchUserAddPhotoURL", async (link) => {
  try {
    await firebase.auth().currentUser.updateProfile({
      photoURL: link,
    });
    return link
  } catch (e) {
    return console.log(e);
  }
});
