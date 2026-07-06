import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export async function createOrder(orderData) {
  const orderRef = await addDoc(collection(db, "orders"), {
    ...orderData,
    createdAt: new Date(),
  });

  return orderRef;
}