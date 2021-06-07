import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../../firebase/firebase";

export const fetchUserEditEmail = createAsyncThunk("user/fetchUserEditEmail", async ({userEmail, password, email}) => {
  // try {
  //   // await firebase.auth().signInWithEmailAndPassword(userEmail, password)
  //   // await firebase.auth().currentUser.updateEmail(email)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  //   // return email
  //   return firebase.auth()
  //     .signInWithEmailAndPassword(userEmail, password)
  //     .then((userCredential) => {
  //       userCredential.user.updateEmail(email)
  //       return email
  //     })
  //     .catch((e) => {
  //       new Error(e)
  //     })
  // } catch (error) {
  //   new Error(error);
  // }
  console.log({userEmail, password, email})
  try {
    return new Promise((resolve, reject) => {
      
      firebase.auth()
        .signInWithEmailAndPassword(userEmail, password)
        .then((userCredential) => {
          
          userCredential.user.updateEmail(email)
          resolve(email)
        }, 
        (err) => {
          reject(err);
        })
    }).then((email) => {
      return email
    });
  } catch (error) {
    throw new Error(error);
  }
});
