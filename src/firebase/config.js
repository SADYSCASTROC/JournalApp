// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjtUicA2bQwwGvEyvO9amMOyrpWhSllZA",
  authDomain: "react-cursos-a13ad.firebaseapp.com",
  projectId: "react-cursos-a13ad",
  storageBucket: "react-cursos-a13ad.appspot.com",
  messagingSenderId: "516981903657",
  appId: "1:516981903657:web:761056962c874a0e6e2738"
};


// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );