import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3uQ6cnFM6fSEC1ce0SfdXZAm2LXsYKv0",
  authDomain: "ecosave-ab2bd.firebaseapp.com",
  projectId: "ecosave-ab2bd",
  storageBucket: "ecosave-ab2bd.appspot.com",
  messagingSenderId: "625614195939",
  appId: "1:625614195939:web:c0abad1c57a912e1f1c9d6",
  measurementId: "G-J6MWHQ7ZPT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
