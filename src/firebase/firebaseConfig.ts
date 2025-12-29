import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNWEe0b5XrZuFkjg0G0NrEnm9q9_yG8sQ",
  authDomain: "scameleon-4206e.firebaseapp.com",
  projectId: "scameleon-4206e",
  storageBucket: "scameleon-4206e.firebasestorage.app",
  messagingSenderId: "316713264297",
  appId: "1:316713264297:web:e14f7303772deb79bdb5b8",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
