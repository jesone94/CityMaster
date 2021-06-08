import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import firebase from "../../firebase/firebase";

const url = process.env.REACT_APP_DATABASE_URL;

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
