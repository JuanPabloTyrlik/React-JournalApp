import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIRESTORE_APIKEY,
    authDomain: process.env.REACT_APP_FIRESTORE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIRESTORE_DATABASEURL,
    projectId: process.env.REACT_APP_FIRESTORE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIRESTORE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIRESTORE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIRESTORE_APPID,
    measurementId: process.env.REACT_APP_FIRESTORE_MEASUREMENTID,
};

if (!firebaseConfig.measurementId) delete firebaseConfig.measurementId;

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
