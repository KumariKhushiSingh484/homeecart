import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "./firebase";

export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const getUserRole = async (uid) => {
  console.log("Searching UID:", uid);

  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  console.log("Document exists:", userSnap.exists());

  if (userSnap.exists()) {
    console.log("Document data:", userSnap.data());
    return userSnap.data().role;
  }

  return null;
};