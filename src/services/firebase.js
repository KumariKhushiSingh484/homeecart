import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAYbuXtw6UZH3GWJopohL-Uma9uhYYs7qc",
  authDomain: "homeecart-production.firebaseapp.com",
  projectId: "homeecart-production",
  storageBucket: "homeecart-production.firebasestorage.app",
  messagingSenderId: "973870098192",
  appId: "1:973870098192:web:077960cf931f84bf83a795",
  measurementId: "G-4S9RSDJCYE",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);