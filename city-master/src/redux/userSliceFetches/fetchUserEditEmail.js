import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../../firebase/firebase";

export const fetchUserEditEmail = createAsyncThunk(
  "user/fetchUserEditEmail",
  async ({ userEmail, password, email }) => {
    try {
      return new Promise((resolve, reject) => {
        firebase
          .auth()
          .signInWithEmailAndPassword(userEmail, password)
          .then((userCredential) => {
            userCredential.user.updateEmail(email);
            resolve(email);
          })
          .catch((e) => reject(e));
      }).then((email) => {
        return email;
      });
    } catch (error) {
      throw new Error(error);
    }
  }
);
