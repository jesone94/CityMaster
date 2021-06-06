import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../../firebase/firebase";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {

  try {

  function addUserData() {
    firebase.database().ref(`users`).set({
      uid: '12345',
      budget: 0,
      costs: {
        Home: 0,
        Family: 0,
        Travels: 0,
        Food: 0,
        Entertainment: 0,
        Other: 0,
      },
      data: new Date().toJSON(),
    });
  }
  addUserData()
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(
        (firebaseUser) => {
          console.log(firebaseUser)
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
