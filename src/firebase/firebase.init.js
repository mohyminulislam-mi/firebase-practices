// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAe3Un3qCPhnPXn31HO0xPQC8VDKYHUjXw",
  authDomain: "simple-firebase-dec53.firebaseapp.com",
  projectId: "simple-firebase-dec53",
  storageBucket: "simple-firebase-dec53.firebasestorage.app",
  messagingSenderId: "451298825591",
  appId: "1:451298825591:web:549e6ac5831cb75312bd72",
  measurementId: "G-XW0MKZTLQD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
