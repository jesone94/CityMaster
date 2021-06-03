import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../firebase/firebase";
import { fetchUser } from './userSliceFetches/fetchUserStart';
import { fetchUserRemovePhoto } from './userSliceFetches/fetchUserRemovePhoto'
import { fetchUserAddPhotoURL } from "./userSliceFetches/fetchUserAddPhotoURL";
import { fetchUserEditEmail } from "./userSliceFetches/fetchUserEditEmail";
import { fetchUserDisplayName } from "./userSliceFetches/fetchUserDisplayName";
import { fetchUserSignIn } from "./userSliceFetches/fetchUserSignIn";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userEmail: null,
    displayName: null,
    uid: null,
    photoURL: null,
    loading: false,
    error: null,
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

    editDisplayName(state, action) {
      state.displayName = action.payload;
    },
    addLoading(state) {
      state.loading = true;
    },
    removeLoading(state) {
      state.loading = false;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchUser.pending]: (state, { meta }) => {
      state.loading = true;
    },
    [fetchUser.fulfilled]: (state, { payload }) => {
      state.userEmail = payload.email;
      state.displayName = payload.displayName;
      state.uid = payload.uid;
      state.photoURL = payload.photoURL;
      state.loading = false;
      state.error = null;
    },
    [fetchUser.rejected]: (state, { meta, payload, error }) => {
      state.error = error.message;
      state.loading = false;
    },
    [fetchUserRemovePhoto.fulfilled]: (state) => {
      state.photoURL = null;
    },
    [fetchUserAddPhotoURL.pending]: (state, action) => {
      console.log('pending photo')
      state.loading = true;
    },
    [fetchUserAddPhotoURL.fulfilled]: (state, action) => {
      console.log('fullified photo')
      state.loading = false;
      state.photoURL = action.payload;
    },
    [fetchUserEditEmail.fulfilled]: (state, action) => {
      state.userEmail = action.payload;
    },
    [fetchUserDisplayName.fulfilled]: (state, action) => {
      state.displayName = action.payload;
    },
    [fetchUserSignIn.pending]: (state) => {
      state.loading = true;
    },
    [fetchUserSignIn.fulfilled]: (state, { payload }) => {
      console.log(payload, 'fulified')
      state.userEmail = payload.email;
      state.displayName = payload.displayName;
      state.uid = payload.uid;
      state.photoURL = payload.photoURL;
      state.loading = false;
    },
    [fetchUserSignIn.rejected]: (state, { meta, payload, error }) => {
      console.log( error.message )
      if (error.message === 'Error: There is no user record corresponding to this identifier. The user may have been deleted.'){
        state.error = "Ошибка: нет записи пользователя, соответствующей этому идентификатору."
      }
      if (error.message === "Error: The password is invalid or the user does not have a password."){
        state.error = "Ошибка: неверный пароль или у пользователя нет пароля."
      }
      if (error.message === "Error: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."){
        state.error = "Ошибка: доступ к этой учетной записи был временно приостановлен"
      } else {
        state.error = "Произошла какая-то ошибка"
      }
      
      state.loading = false;
    }
  },
});

export default userSlice;
export const { addUser, removeUser, addPhoto, removePhoto, addLoading, removeLoading } =
  userSlice.actions;
