import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../firebase/firebase";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    // const user = await firebase.auth().onAuthStateChanged(firebaseUser => {
    //   firebaseUser
    // })

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
      console.log(firebaseUser)
      //photoURL
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    userEmail: null,
    displayName: null,
    uid: null,
    photoURL: null,
  },
  reducers: {
    addUser(state, action) {
      state.userEmail = action.payload.email;
      state.displayName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.photoURL = action.payload.photoURL;
      state.loading = null;
    },
    removeUser(state) {
      state.userEmail = null;
      state.displayName = null;
      state.uid = null;
      state.photoURL = undefined;
      state.loading = null;
    },
    editEmail(state, action) {
      state.userEmail = action.payload;
    },
    addPhoto(state, action) {
      state.photoURL = action.payload;
    },
    removePhoto(state) {
      state.photoURL = null;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchUser.pending]: (state, { meta }) => {
      state.loading = "pending";
    },
    [fetchUser.fulfilled]: (state, { payload }) => {
      state.userEmail = payload.email;
      state.displayName = payload.displayName;
      state.uid = payload.uid;
      state.photoURL = payload.photoURL;
      state.loading = "fulfilled";
    },
    [fetchUser.rejected]: (state, { meta, payload, error }) => {
      state.error = error;
      state.loading = "error";
    },
  },
});

export default userSlice;
export const { addUser, removeUser, addPhoto, removePhoto, editEmail } = userSlice.actions;
