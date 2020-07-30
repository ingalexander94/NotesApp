import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDcrMPCY7oWFbW2CCWXK7NuFLgZSS87Ls0",
  authDomain: "react-app-curso-c8367.firebaseapp.com",
  databaseURL: "https://react-app-curso-c8367.firebaseio.com",
  projectId: "react-app-curso-c8367",
  storageBucket: "react-app-curso-c8367.appspot.com",
  messagingSenderId: "56463013663",
  appId: "1:56463013663:web:4d6403ae5f9ce28019622a",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
