// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCraiWcf-5LhN6GJqw77jVINbfRWA2MYxc",
  authDomain: "ualbertacampus-activity-finder.firebaseapp.com",
  projectId: "ualbertacampus-activity-finder",
  storageBucket: "ualbertacampus-activity-finder.appspot.com", // Fixed typo
  messagingSenderId: "942573692679",
  appId: "1:942573692679:web:2162ed71c729f6fee807a2",
  measurementId: "G-WKPCRW267Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
