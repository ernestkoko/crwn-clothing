import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCcADXbHFLtTg2omyxGkOYk_SEG64Tp2u0",
    authDomain: "crwn-db-6db20.firebaseapp.com",
    databaseURL: "https://crwn-db-6db20.firebaseio.com",
    projectId: "crwn-db-6db20",
    storageBucket: "crwn-db-6db20.appspot.com",
    messagingSenderId: "363322573597",
    appId: "1:363322573597:web:41dcdbf192d42bed5717f4",
    measurementId: "G-BV9FWM0XNG"
  };
//initialises the firebase with the config
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  //google auth
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;