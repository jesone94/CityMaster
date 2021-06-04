import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../../firebase/firebase";

export const fetchUserRemovePhoto = createAsyncThunk("user/fetchUserRemovePhoto", async () => {
  try {
    return await firebase.auth().currentUser.updateProfile({
      photoURL: "",
    });
  } catch (error) {
    new Error(error);
  }
});
