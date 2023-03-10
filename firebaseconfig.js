// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsYvcII5dLQIRX-5RIJgfwsIrj4ii-h3g",
  authDomain: "chatapp-1d785.firebaseapp.com",
  projectId: "chatapp-1d785",
  storageBucket: "chatapp-1d785.appspot.com",
  messagingSenderId: "852790156351",
  appId: "1:852790156351:web:9ceef635b168db59926c8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db}