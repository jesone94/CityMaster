import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../../firebase/firebase";

export const fetchUserSignUp = createAsyncThunk(
  "user/fetchUserSignUp",
  async (data) => {
    try {
      const { name, email, password } = data;
      let user;
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().currentUser.updateProfile({
        displayName: `${name}`,
      });
      await firebase.auth().onAuthStateChanged((firebaseUser) => {
        user = {
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        };
      });
      return user;
    } catch (error) {
      throw new Error(error);

      // onFinishFailed(error)
    }
  }
);
