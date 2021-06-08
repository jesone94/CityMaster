import firebase from '../../firebase/firebase';
import 'firebase/storage';
import axios from "axios";

 const url = process.env.REACT_APP_DATABASE_URL;

export function addUserData(uid, displayName) {
  firebase.database().ref(`users/${uid}`).set({
    data: new Date().toJSON(),
    score: 0,
    file: null,
    displayName,
    urlImg: null,
    favorites: [],
    statistic: [],
  });
}

export const addScore = async (uid, num) => {
  firebase
    .database()
    .ref(`/users/${uid}`)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        let { score } = snapshot.val();
        score += num;
        firebase.database().ref(`users/${uid}`).update({ score });
        firebase.database().ref(`users/${uid}/statistic`).push({num, data: new Date().toJSON(), action: "ADD"})
          .then(() => console.log('Успешно добавлено в базу ADD'))
          .catch((e) => console.log(e))
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
export const reduceScore = async (uid, num) => {

  firebase
    .database()
    .ref(`/users/${uid}`)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        let { score } = snapshot.val();
        score -= num;
        firebase.database().ref(`users/${uid}`).update({ score });
        firebase.database().ref(`users/${uid}/statistic`).push({num, data: new Date().toJSON(), action: "REDUCE"})
        .then(() => console.log('Успешно добавлено в базу REDUCE'))
        .catch((e) => console.log(e))
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
  

export const score = (uid) =>
  firebase
    .database()
    .ref(`/users/${uid}`)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val().score;
      }
      console.log('No data available');
    });

export const allUsers = () =>
  firebase
    .database()
    .ref(`/users/`)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val()).sort((a, b) => b.score - a.score);
      }
      console.log('No data available');
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
      console.log('File deleted successfully');
    })
    .catch((error) => {
      console.log('Uh-oh, an error occurred!');
    });
};



