import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../../firebase/firebase";
import { removePhotoFromStorage } from "../database/firebaseDatabse";

export const fetchUserRemovePhoto = createAsyncThunk("user/fetchUserRemovePhoto", async ({uid}) => {
  try {
    removePhotoFromStorage(uid)
    return await firebase.auth().currentUser.updateProfile({
      photoURL: "",
    });
  } catch (error) {
    new Error(error);
  }
});
