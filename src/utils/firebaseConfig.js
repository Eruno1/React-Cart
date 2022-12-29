// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWgciDllt8c06HC28YPS-_-QHW_M1xhOo",
  authDomain: "ecomm-padel.firebaseapp.com",
  databaseURL: "https://ecomm-padel-default-rtdb.firebaseio.com",
  projectId: "ecomm-padel",
  storageBucket: "ecomm-padel.appspot.com",
  messagingSenderId: "463412689269",
  appId: "1:463412689269:web:b409c02e9634e8a23b7b3c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
