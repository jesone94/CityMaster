import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../../firebase/firebase";

export const fetchUserEditEmail = createAsyncThunk("user/fetchUserEditEmail", async (userEmail, password, email) => {
  try {
    await firebase.auth()
      .signInWithEmailAndPassword(userEmail, password)
      .then(function(userCredential) {
          userCredential.user.updateEmail(email)
          return email
      })
  } catch (e) {
    return console.log(e);
  }
});
