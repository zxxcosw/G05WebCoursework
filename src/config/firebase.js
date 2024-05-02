import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATvf8m9Glvd1GbDFUqdGOUASAroo7dR68",
  authDomain: "demo6239-33499.firebaseapp.com",
  databaseURL: "https://demo6239-33499-default-rtdb.firebaseio.com",
  projectId: "demo6239-33499",
  storageBucket: "demo6239-33499.appspot.com",
  messagingSenderId: "425034826874",
  appId: "1:425034826874:web:aa1bb9adb0f24eebffa7c3",
  measurementId: "G-YEFDQEFS79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app);