import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAX7GQqS1Z6mOcN5L1gAifnvZUITkE0hJM',
    authDomain: 'jp-journal-app.firebaseapp.com',
    databaseURL: 'https://jp-journal-app.firebaseio.com',
    projectId: 'jp-journal-app',
    storageBucket: 'jp-journal-app.appspot.com',
    messagingSenderId: '586274830622',
    appId: '1:586274830622:web:e473d05867c1939369310f',
    measurementId: 'G-S51BEEMS8H',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
