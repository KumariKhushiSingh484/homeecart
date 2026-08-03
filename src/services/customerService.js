import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
  query,
  orderBy,
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

  // Timeline
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
  lastLogin: serverTimestamp(),

  // Customer Activity
  loginCount: 1,

  // Shopping Statistics
  totalOrders: 0,
  totalSpent: 0,
  totalPV: 0,

  // Order History
  lastOrderDate: null,
});
};
export const updateCustomerLogin = async (uid) => {
  try {
    const customerRef = doc(db, "customers", uid);

    await updateDoc(customerRef, {
      lastLogin: serverTimestamp(),
      loginCount: increment(1),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating customer login:", error);
  }
};
export const updateCustomerStats = async (
  uid,
  orderTotal,
  orderPV
) => {
  try {
    const customerRef = doc(db, "customers", uid);

    await updateDoc(customerRef, {
      totalOrders: increment(1),
      totalSpent: increment(orderTotal),
      totalPV: increment(orderPV),
      lastOrderDate: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(
      "Error updating customer stats:",
      error
    );
  }
};


// ...keep all your other functions unchanged

export const getAllCustomers = async () => {
  try {
    const customersQuery = query(
      collection(db, "customers"),
      orderBy("lastLogin", "desc")
    );

    const snapshot = await getDocs(customersQuery);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(
      "Error fetching customers:",
      error
    );

    return [];
  }
};