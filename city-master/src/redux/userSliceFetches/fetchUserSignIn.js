import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../../firebase/firebase";

export const fetchUserSignIn = createAsyncThunk("user/fetchUserSignIn", async (data) => {

    try {
      const { email, password } = data;
      let user = {}
      await firebase.auth().signInWithEmailAndPassword(email, password);
      await firebase.auth().onAuthStateChanged((firebaseUser) => {
        user = {
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          uid: firebaseUser.uid,
          photoURL: firebaseUser.photoURL,
        }
      });
      return user
    } catch (e){
      throw new Error(e)
    }

});
