import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../../firebase/firebase";

export const fetchUserDisplayName = createAsyncThunk("user/fetchUserDisplayName", async (displayNameInput) => {
  try {
    let username = ''
    await firebase.auth().currentUser.updateProfile({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
      displayName: `${displayNameInput}`
    })
    await firebase.auth().onAuthStateChanged(firebaseUser => {
      username = firebaseUser.displayName
    })
    return username
  } catch (e) {
    return console.log(e);
  }
});
