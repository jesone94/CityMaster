import { createAsyncThunk } from "@reduxjs/toolkit";

import firebase from "../../firebase/firebase";

export const fetchUserScrore = createAsyncThunk(
  "user/fetchUserScrore",
  async (uid) => {
    try {
      return firebase
        .database()
        .ref(`/users/${uid}`)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            return snapshot.val().score;
          }
          console.log("No data available");
        });
    } catch (e) {
      return console.log(e);
    }
  }
);
