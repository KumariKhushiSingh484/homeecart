import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

export const getCustomer = async (uid) => {
  const customerRef = doc(db, "customers", uid);
  const customerSnap = await getDoc(customerRef);

  if (customerSnap.exists()) {
    return customerSnap.data();
  }

  return null;
};

export const saveCustomer = async (
  uid,
  customerData
) => {
  await setDoc(doc(db, "customers", uid), {
    ...customerData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};