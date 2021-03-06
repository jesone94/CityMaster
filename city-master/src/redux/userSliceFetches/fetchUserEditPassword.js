import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../../firebase/firebase";

export const fetchUserEditPassword = createAsyncThunk(
  "user/fetchUserEditPassword",
  async ({ userEmail, passwordInput, newPassword }) => {
    try {
      return new Promise((resolve, reject) => {
        firebase.auth()
          .signInWithEmailAndPassword(userEmail, passwordInput)
          .then((userCredential) => {
            
            userCredential.user.updatePassword(newPassword)
            resolve(newPassword)
          })
          .catch((e) => reject(e))
      }).then((newPassword) => {
        return newPassword
      });
    } catch (error) {
      throw new Error(error);
    }

  }
);
