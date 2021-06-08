import firebase from "../../firebase/firebase";
import "firebase/storage";

export function addUserData(uid, displayName) {
  firebase.database().ref(`users/${uid}`).set({
    data: new Date().toJSON(),
    score: 0,
    file: null,
    displayName,
    urlImg: null,
    favorites: [],
  });
}

export const addScore = (uid, num) =>
  firebase
    .database()
    .ref(`/users/${uid}`)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        let { score } = snapshot.val();
        score += num;
        firebase.database().ref(`users/${uid}`).update({ score });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

export const reduceScore = (uid, num) =>
  firebase
    .database()
    .ref(`/users/${uid}`)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        let { score } = snapshot.val();
        score -= num;
        firebase.database().ref(`users/${uid}`).update({ score });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

export const score = (uid) =>
  firebase
    .database()
    .ref(`/users/${uid}`)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val().score;
      }
      console.log("No data available");
    });

export const allUsers = () =>
  firebase
    .database()
    .ref(`/users/`)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      console.log("No data available");
    });

export const addFileName = (uid, filename) =>
  firebase.database().ref(`users/${uid}`).update({ file: filename });

export const addUrlImg = (uid, url) =>
  firebase.database().ref(`users/${uid}`).update({ urlImg: url });

export const addDisplayName = (uid, name) =>
  firebase.database().ref(`users/${uid}`).update({ displayName: name });

export const removePhotoFromStorage = async (uid) => {
  const filename = await firebase
    .database()
    .ref(`/users/${uid}`)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val().file;
      }
    });
  console.log(filename);
  firebase
    .storage()
    .ref(`avatars/${uid}/${filename}`)
    .delete()
    .then(() => {
      console.log("File deleted successfully");
    })
    .catch((error) => {
      console.log("Uh-oh, an error occurred!");
    });
};



