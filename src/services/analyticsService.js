import {
  doc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";

import { db } from "./firebase";

const analyticsRef = doc(
  db,
  "analytics",
  "website"
);
export const incrementVisitors = async () => {
  try {
    await updateDoc(analyticsRef, {
      totalVisitors: increment(1),
    });
  } catch (error) {
    console.error("Error updating visitors:", error);
  }
};
export const incrementLogins = async () => {
  try {
    await updateDoc(analyticsRef, {
      totalLogins: increment(1),
    });
  } catch (error) {
    console.error("Error updating logins:", error);
  }
};
export const getAnalytics = async () => {
  try {
    const snapshot = await getDoc(analyticsRef);

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data();
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return null;
  }
};