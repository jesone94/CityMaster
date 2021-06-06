import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../../firebase/firebase";

export const fetchUserEditPassword = createAsyncThunk(
  "user/fetchUserEditPassword",
  async ({ userEmail, password, newPassword }) => {
    // try {
    //   return new Promise((resolve, reject) => {
    //     firebase
    //       .auth()
    //       .signInWithEmailAndPassword(userEmail, password)
    //       .then(
    //         (userCredential) => {
    //           console.log(userCredential);
    //           userCredential.user.updatePassword(`${newPassword}`);
    //           resolve(newPassword);
    //         },
    //         (err) => {
    //           reject(err);
    //         }
    //       );
    //   }).then((newPassword) => {
    //     return newPassword;
    //   });
    // } catch (error) {
    //   throw new Error(error);
    // }
    try {
      await firebase.auth().signInWithEmailAndPassword(userEmail, password)
      await firebase.auth().currentUser.updatePassword(newPassword);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

    } catch (error) {
      throw new Error(error);
    }
  }
);
