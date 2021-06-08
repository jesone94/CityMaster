import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../../firebase/firebase";
import { fetchFavorites } from "../database/firebaseAllFavorites";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(
        (firebaseUser) => {
          resolve(firebaseUser);
        },
        (err) => {
          reject(err);
        }
      );
    }).then((firebaseUser) => {

      return {
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        uid: firebaseUser.uid,
        photoURL: firebaseUser.photoURL,
      };
    });
  } catch (e) {
    return console.log(e);
  }
});
