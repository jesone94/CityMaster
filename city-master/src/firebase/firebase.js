import app from 'firebase/app'
import 'firebase/auth'
import 'firebase'
import serviceAccount from '../city-master-b70d3-firebase-adminsdk.json'
import admin from 'firebase-admin'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_KEY,
  authDomain: process.env.REACT_APP_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_DOMAIN_APP_ID,
};

const firebase = app.initializeApp(firebaseConfig)

export default firebase
