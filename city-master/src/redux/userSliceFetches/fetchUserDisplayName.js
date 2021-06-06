import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../../firebase/firebase";
import { addDisplayName } from "../database/firebaseDatabse";

export const fetchUserDisplayName = createAsyncThunk("user/fetchUserDisplayName", async ({uid, displayNameInput}) => {
  try {
    let username = ''
    await firebase.auth().currentUser.updateProfile({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
      displayName: `${displayNameInput}`
    })
    await firebase.auth().onAuthStateChanged(firebaseUser => {
      username = firebaseUser.displayName
    })
    addDisplayName(uid, username)
    return username
  } catch (e) {
    return console.log(e);
  }
});
