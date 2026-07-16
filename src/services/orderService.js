import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { db } from "./firebase";

// ============================================
// Create Order
// ============================================

export async function createOrder(orderData) {
  const orderRef = await addDoc(
    collection(db, "orders"),
    {
      ...orderData,
      createdAt: serverTimestamp(),
    }
  );

  return orderRef;
}

// ============================================
// Get Customer Orders
// ============================================

export async function getCustomerOrders(uid) {
  const ordersQuery = query(
    collection(db, "orders"),
    where("uid", "==", uid),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(ordersQuery);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// ============================================
// Get Single Order
// ============================================

export async function getOrderById(orderId) {
  const orderRef = doc(db, "orders", orderId);

  const snapshot = await getDoc(orderRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}