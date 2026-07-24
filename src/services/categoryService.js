import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
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
export async function updateCategoryStatus(
  categoryId,
  isActive
) {
  const categoryRef = doc(
    db,
    "categories",
    categoryId
  );

  await updateDoc(categoryRef, {
    isActive,
  });
}
export async function deleteCategory(categoryId) {
  await deleteDoc(
    doc(db, "categories", categoryId)
  );
}
export async function hasProducts(categoryName) {
  const q = query(
    collection(db, "products"),
    where("category", "==", categoryName)
  );

  const snapshot = await getDocs(q);

  return !snapshot.empty;
}
export async function updateCategory(
  categoryId,
  categoryData
) {
  const categoryRef = doc(
    db,
    "categories",
    categoryId
  );

  await updateDoc(categoryRef, categoryData);
}