import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser } from "./userSliceFetches/fetchUserStart";
import { fetchUserRemovePhoto } from "./userSliceFetches/fetchUserRemovePhoto";
import { fetchUserAddPhotoURL } from "./userSliceFetches/fetchUserAddPhotoURL";
import { fetchUserEditEmail } from "./userSliceFetches/fetchUserEditEmail";
import { fetchUserDisplayName } from "./userSliceFetches/fetchUserDisplayName";
import { fetchUserSignIn } from "./userSliceFetches/fetchUserSignIn";
import { fetchUserSignUp } from "./userSliceFetches/fetchUserSignUp";
import { fetchUserEditPassword } from "./userSliceFetches/fetchUserEditPassword";
import { fetchUserHandleLike } from "./userSliceFetches/fetchUserHandleLike";
import { fetchUserAllFavorites } from "./userSliceFetches/fetchUserAllFavorites";
import { fetchUserScrore } from "./userSliceFetches/fetchUserScore";
import { fetchUserRemoveFavoriteElement } from "./userSliceFetches/fetchUserRemoveFavoriteElement";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userEmail: null,
    displayName: null,
    uid: null,
    photoURL: null,
    loading: false,
    error: null,
    editStatus: false,
    favorites: [],
    score: 0,
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
    nullErrorAndStatus (state) {
      state.editStatus = false;
      state.error = null;
    },
    loadFavorites (state, { payload }) {
      state.favorites = payload
    },
    userAddScore(state, { payload }) {
      state.score += payload
    },
    userReduceScore(state, { payload }) {
      state.score -= payload
    }
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
      state.editStatus = true;
      state.loading = false;
      state.error = "Успешно";
      state.userEmail = action.payload;
    },
    [fetchUserEditEmail.rejected]: (state, { error }) => {
      state.editStatus = false;
      state.loading = false;
      state.error = error.message;
    },
    [fetchUserDisplayName.fulfilled]: (state, action) => {
      state.editStatus = true;
      state.displayName = action.payload;
      state.error = "Успешно";
      state.loading = false;
    },
    [fetchUserDisplayName.rejected]: (state, action) => {
      state.editStatus = false;
      state.editStatus = true;
      state.displayName = action.payload;
      state.error = "Успешно";
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
    [fetchUserEditPassword.rejected]: (state, { error }) => {
      console.log(error.message)
      state.editStatus = false;
      state.loading = false;
      state.error = error.message;
    },
    [fetchUserEditPassword.fulfilled]: (state, payload) => {
      console.log('sucsess')
      state.editStatus = true;
      state.loading = false;
      state.error = "Успешно";
    },
    [fetchUserHandleLike.fulfilled]: (state, { payload }) => {
      state.favorites.push(payload)
    },
    [fetchUserAllFavorites.fulfilled]: (state, { payload }) => {
      state.favorites = payload;
    },
    [fetchUserScrore.fulfilled]: (state, { payload }) => {
      state.score = payload
    },
    [fetchUserRemoveFavoriteElement.fulfilled]: (state, { payload }) => {
     state.favorites.filter(({id}) => id !== payload)
    }
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
  nullErrorAndStatus,
  addPhotoLoading,
  removePhotoLoading,
  userAddScore,
  userReduceScore
} = userSlice.actions;
