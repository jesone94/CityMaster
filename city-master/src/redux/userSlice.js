import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser } from "./userSliceFetches/fetchUserStart";
import { fetchUserRemovePhoto } from "./userSliceFetches/fetchUserRemovePhoto";
import { fetchUserAddPhotoURL } from "./userSliceFetches/fetchUserAddPhotoURL";
import { fetchUserEditEmail } from "./userSliceFetches/fetchUserEditEmail";
import { fetchUserDisplayName } from "./userSliceFetches/fetchUserDisplayName";
import { fetchUserSignIn } from "./userSliceFetches/fetchUserSignIn";
import { fetchUserSignUp } from "./userSliceFetches/fetchUserSignUp";
import { fetchUserEditPassword } from "./userSliceFetches/fetchUserEditPassword";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userEmail: null,
    displayName: null,
    uid: null,
    photoURL: null,
    loading: false,
    error: "",
  },
  reducers: {
    addUser(state, action) {
      state.userEmail = action.payload.email;
      state.displayName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.photoURL = action.payload.photoURL;
      state.loading = null;
      state.photoLoading = null;
    },
    removeUser(state) {
      state.userEmail = null;
      state.displayName = null;
      state.uid = null;
      state.photoURL = undefined;
      state.loading = null;
      state.photoLoading = null;
      state.error = null;
    },

    // editDisplayName(state, action) {
    //   state.displayName = action.payload;
    // },
    addLoading(state) {
      state.loading = true;
    },
    addPhotoLoading(state) {
      state.photoLoading = true;
    },
    removePhotoLoading(state) {
      state.photoLoading = false;
    },
    removeLoading(state) {
      state.loading = false;
    },
    nullError(state) {
      state.error = null;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchUser.pending]: (state, { meta }) => {
      state.loading = true;
      state.error = null;
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
      // state.error = error.message;
      state.loading = false;
    },
    [fetchUserRemovePhoto.fulfilled]: (state) => {
      state.photoURL = null;
      state.photoLoading = false;
    },
    [fetchUserAddPhotoURL.pending]: (state, action) => {
      state.photoLoading = true;
    },
    [fetchUserAddPhotoURL.fulfilled]: (state, action) => {
      state.photoLoading = false;
      state.photoURL = action.payload;
    },
    [fetchUserAddPhotoURL.rejected]: (state, { error }) => {
      state.error = error.message;
      state.photoLoading = false;
    },
    [fetchUserEditEmail.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUserEditEmail.fulfilled]: (state, action) => {
      state.loading = false;
      state.userEmail = action.payload;
    },
    [fetchUserEditEmail.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error.message;
    },
    [fetchUserDisplayName.fulfilled]: (state, action) => {
      state.displayName = action.payload;
      state.error = null;
      state.loading = false;
    },
    [fetchUserSignIn.pending]: (state) => {
      state.loading = true;
    },
    [fetchUserSignIn.fulfilled]: (state, { payload }) => {
      state.userEmail = payload.email;
      state.displayName = payload.displayName;
      state.uid = payload.uid;
      state.photoURL = payload.photoURL;
      state.loading = false;
    },
    [fetchUserSignIn.rejected]: (state, { meta, payload, error }) => {
      state.error = error.message;
      state.loading = false;
    },
    [fetchUserSignUp.pending]: (state) => {
      state.loading = true;
    },
    [fetchUserSignUp.fulfilled]: (state, { meta, payload, error }) => {
      state.userEmail = payload.email;
      state.displayName = payload.displayName;
      state.uid = payload.uid;
      state.photoURL = payload.photoURL;
      state.loading = false;
    },
    [fetchUserSignUp.rejected]: (state, { meta, payload, error }) => {
      state.error = error.message;
      state.loading = false;
    },
    [fetchUserEditPassword.pending]: (state) => {
      state.loading = true;
    },
    [fetchUserEditPassword.fulfilled]: (state, payload) => {
      state.error = "";
      state.loading = false;
    },
    [fetchUserEditPassword.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error.message;
    },
  },
});

export default userSlice;
export const {
  addUser,
  removeUser,
  addPhoto,
  removePhoto,
  addLoading,
  removeLoading,
  nullError,
  addPhotoLoading,
  removePhotoLoading,
} = userSlice.actions;
