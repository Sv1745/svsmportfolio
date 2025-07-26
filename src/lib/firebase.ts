// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBu8JM0N7SzBUvnmQ9RcP7-Kk6FrmOI8Es",
  authDomain: "svsmportfolio.firebaseapp.com",
  projectId: "svsmportfolio",
  storageBucket: "svsmportfolio.firebasestorage.app",
  messagingSenderId: "189633404694",
  appId: "1:189633404694:web:c6f59428f99a161cadfa37",
  measurementId: "G-WSD7DQN6B5"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };