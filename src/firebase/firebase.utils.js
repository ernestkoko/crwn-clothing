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

  //makes an async call to create user profile
export const createUserProfileDocument = async (userAuth, additionalData) => {
    //check if the user is null and return if it is
    if(!userAuth) return;

    const userRef =  firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    console.log(snapShot);

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
            
        } catch (error) {
            console.log('Error creating user', error.message);
            
        }
    }
    return userRef;



}

//initialises the firebase with the config
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  //google auth
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;