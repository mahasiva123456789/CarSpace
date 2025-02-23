// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8LP-II0JxUlbIA6hxdRPM7XRGuLiZkVM",
  authDomain: "carspaceauth.firebaseapp.com",
  projectId: "carspaceauth",
  storageBucket: "carspaceauth.firebasestorage.app",
  messagingSenderId: "530332850351",
  appId: "1:530332850351:web:ef51609872c6473cc31c5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };