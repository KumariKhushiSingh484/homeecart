import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

import { db } from "./firebase";

// ==================== Get Categories ====================

export async function getCategories() {
  const snapshot = await getDocs(
    collection(db, "categories")
  );

  const categories = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return categories.sort(
    (a, b) =>
      (a.displayOrder || 0) -
      (b.displayOrder || 0)
  );
}

// ==================== Add Category ====================

export async function addCategory(categoryData) {
  await addDoc(
    collection(db, "categories"),
    categoryData
  );
}