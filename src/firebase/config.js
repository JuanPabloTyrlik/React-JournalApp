import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import 'firebase/analytics';

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

const firebaseConfigTesting = {
    apiKey: 'AIzaSyAM26yWNiGd13KhKS6Qqd53MJssVseipA8',
    authDomain: 'sql-demos-7e4c0.firebaseapp.com',
    databaseURL: 'https://sql-demos-7e4c0.firebaseio.com',
    projectId: 'sql-demos-7e4c0',
    storageBucket: 'sql-demos-7e4c0.appspot.com',
    messagingSenderId: '713305350269',
    appId: '1:713305350269:web:0a61127770c832946d9114',
};

if (process.env.NODE_ENV === 'test') {
    firebase.initializeApp(firebaseConfigTesting);
} else {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

// firebase.analytics();

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
